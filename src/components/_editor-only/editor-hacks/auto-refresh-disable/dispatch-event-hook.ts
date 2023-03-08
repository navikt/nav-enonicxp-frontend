import {
    editorFetchAdminContent,
    editorFetchAdminUserId,
    editorFetchUserInfo,
} from '../editor-fetch-utils';
import {
    ContentProps,
    ContentType,
} from '../../../../types/content-props/_content-common';
import { Branch } from '../../../../types/branch';

// From lib-admin-ui
export enum NodeServerChangeType {
    UNKNOWN,
    PUBLISH,
    DUPLICATE,
    CREATE,
    UPDATE,
    DELETE,
    PENDING,
    RENAME,
    SORT,
    MOVE,
    UPDATE_PERMISSIONS,
}

export type BatchContentServerEventItem = {
    id: string;
    branch: Branch;
    path: {
        refString: string;
    };
};

type BatchContentServerEventDetail = {
    type: NodeServerChangeType;
    items?: BatchContentServerEventItem[];
    // We add this field to the event detail when an event should be
    // dispatched on behalf of the user via the alertbox dialog
    userTriggered?: true;
};

const currentContentDidUpdate = (
    eventDetail: BatchContentServerEventDetail,
    currentContentId: string
) => eventDetail?.items?.some((item) => item.id === currentContentId);

const getUserNameFromEmail = (userEmail) =>
    userEmail?.split('@')[0].replace('.', ' ');

const ignoredContentTypes = {
    [ContentType.GlobalNumberValuesSet]: true,
    [ContentType.GlobalCaseTimeSet]: true,
};

// Hook the dispatchEvent function on the content studio parent window
// in order to prevent certain events from propagating
export const hookDispatchEventForBatchContentServerEvent = ({
    content,
    setExternalContentChange,
    setExternalUpdateEvent,
    setExternalUserName,
}: {
    content: ContentProps;
    setExternalUserName;
    setExternalContentChange;
    setExternalUpdateEvent;
}) => {
    const { _id: contentId, type: contentType } = content;

    // Some content types use a custom editor. This hack only applies to built-in CS functionality
    if (ignoredContentTypes[contentType]) {
        return;
    }

    // Keep the original function reference for use in our hook. We put it on the parent window object rather than
    // as a local variable, in order to preserve it after the current frontend instance is destroyed.
    if (!parent.window.dispatchEventActual) {
        parent.window.dispatchEventActual = parent.window.dispatchEvent;
    }

    const dispatchEvent = parent.window.dispatchEventActual;

    let prevWorkflowState;
    let userId;
    let skipNextEventIfBatchContentServerEvent = false;

    editorFetchAdminUserId().then((id) => {
        userId = id;
    });

    editorFetchAdminContent(contentId).then((res) => {
        prevWorkflowState = res?.workflow.state;
    });

    parent.window.dispatchEvent = (event: CustomEvent) => {
        const { type: eventType, detail } = event;
        const detailType = detail?.type;

        // We only want to intercept events of the BatchContentServerEvent type, which is what triggers UI updates
        // for content changes on the client. All other events should be dispatched as normal.
        if (eventType !== 'BatchContentServerEvent') {
            skipNextEventIfBatchContentServerEvent = false;
            return dispatchEvent(event);
        }

        // User-triggered events should always be dispatched
        if (detail.userTriggered) {
            console.log('User-triggered event - dispatching event');
            return dispatchEvent(event);
        }

        // Changes to other content may trigger an unnecessary UI-reload if it references the current content
        // Ignore events for other content to prevent this
        if (!currentContentDidUpdate(detail, contentId)) {
            console.log(
                'Skipping this event as current content was not updated'
            );
            return false;
        }

        if (skipNextEventIfBatchContentServerEvent) {
            console.log('Skipping this event as skipNext flag was set');
            skipNextEventIfBatchContentServerEvent = false;
            return false;
        }

        // Publish and unpublish events must always be dispatched in order to keep the editor UI consistent
        // These events are sometimes followed by a BatchContentServerEvent, despite no actual content changes
        // having occurred (the skipNext flag is used to handle this)
        if (detailType === NodeServerChangeType.PUBLISH) {
            console.log('Content published - dispatching event');
            skipNextEventIfBatchContentServerEvent = true;
            return dispatchEvent(event);
        } else if (detailType === NodeServerChangeType.DELETE) {
            console.log('Content unpublished - dispatching event');
            skipNextEventIfBatchContentServerEvent = true;
            return dispatchEvent(event);
        }

        // If the current user could not be determined for whatever reason, the following functionality
        // is not very useful.
        // (this probably indicates that the undocumented api used here has changed)
        if (!userId) {
            console.error(
                'Could not determine the current user - dispatching event'
            );
            return dispatchEvent(event);
        }

        // We use the internal Content Studio content api to check who last modified the content
        editorFetchAdminContent(contentId).then((content) => {
            if (!content) {
                // In the unexpected event that this call fails, just dispatch the event as normal to ensure we
                // don't break anything :)
                // (this probably indicates that the undocumented api used here has changed)
                console.error(
                    'Could not fetch admin content - dispatching event'
                );
                dispatchEvent(event);
            } else if (content.modifier === userId) {
                // If the current user performed the edit which triggered the event, the event should be ignored
                // if and only if the workflow state was "IN_PROGRESS" (ie "mark as ready") both before and after
                // the edit. In this case there is no UI-update needed, and we can ignore the event and prevent
                // an unnecessary UI-refresh
                const newWorkflowState = content.workflow.state;
                console.log(
                    `Edit by current user ${userId} - workflow state before: ${prevWorkflowState} - after: ${newWorkflowState}`
                );

                if (
                    newWorkflowState !== 'IN_PROGRESS' ||
                    prevWorkflowState !== 'IN_PROGRESS'
                ) {
                    dispatchEvent(event);
                }

                prevWorkflowState = newWorkflowState;
            } else {
                // If another user (or service call/scheduled task/script/etc) updated the content, we want to prevent
                // an immediate UI-refresh, as this may cause the current user to lose their changes. We show a
                // warning message instead, and give the user an option to dispatch the update event manually
                console.log(
                    `Content was updated by another user (${userId}) - showing warning`
                );

                editorFetchUserInfo(content.modifier).then((userInfo) => {
                    if (userInfo) {
                        setExternalUserName(
                            getUserNameFromEmail(userInfo.displayName)
                        );
                    }

                    setExternalContentChange(true);

                    // Save the most recent update event for an eventual user-triggered dispatch
                    if (detailType === NodeServerChangeType.UPDATE) {
                        setExternalUpdateEvent(event);
                    }
                });
            }
        });

        // This event may be dispatched in the previous async statement, however we return immediately to
        // preserve the expected dispatchEvent() behaviour
        return false;
    };
};

export const unhookDispatchEventForBatchContentServerEvent = () => {
    if (parent.window.dispatchEventActual) {
        parent.window.dispatchEvent = parent.window.dispatchEventActual;
    }
};

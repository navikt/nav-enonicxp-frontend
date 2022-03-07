import {
    fetchAdminContent,
    fetchAdminUserId,
    fetchUserInfo,
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

// Hook the dispatchEvent function on the content studio parent window
// in order to prevent certain events from propagating
export const hookDispatchEvent = ({
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
    const { _id: contentId, __typename: contentType } = content;

    // The global-values content type is updated via a custom editor and is not relevant for this functionality
    if (contentType === ContentType.GlobalValues) {
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

    fetchAdminUserId().then((id) => {
        userId = id;
    });

    fetchAdminContent(contentId).then((res) => {
        prevWorkflowState = res?.workflow.state;
    });

    parent.window.dispatchEvent = (event: CustomEvent) => {
        const { type: eventType, detail } = event;
        const detailType = detail?.type;

        console.log(eventType);

        // We only want to intercept events of the BatchContentServerEvent type, which is what triggers UI updates
        // for content changes on the client. All other events should be dispatched as normal.
        if (eventType !== 'BatchContentServerEvent') {
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
            return false;
        }

        // Publish and unpublish events must always be dispatched in order to keep the editor UI consistent
        if (detailType === NodeServerChangeType.PUBLISH) {
            console.log('Content published - dispatching event');
            return dispatchEvent(event);
        } else if (detailType === NodeServerChangeType.DELETE) {
            console.log('Content unpublished - dispatching event');
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
        fetchAdminContent(contentId).then((content) => {
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
                console.log(`Current user ${userId} updated the content`);
                const newWorkflowState = content.workflow.state;

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

                fetchUserInfo(content.modifier).then((userInfo) => {
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

        // This event may be dispatched in the previous async statement, however we return immediately to prevent
        // some potentially funky behaviour
        return false;
    };
};

export const unhookDispatchEvent = () => {
    if (parent.window.dispatchEventActual) {
        parent.window.dispatchEvent = parent.window.dispatchEventActual;
    }
};

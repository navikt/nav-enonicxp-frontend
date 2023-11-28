import {
    editorFetchAdminContent,
    editorFetchAdminUserId,
    editorFetchUserInfo,
    isContentRepo,
    isCurrentEditorRepo,
} from 'components/_editor-only/editor-hacks/editor-hacks-utils';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { Branch } from 'types/branch';

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
    const { _id: currentContentId, type: contentType } = content;

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

    let userId;

    editorFetchAdminUserId().then((id) => {
        userId = id;
    });

    parent.window.dispatchEvent = (event: CustomEvent) => {
        const { type: eventType, detail } = event;
        const detailType = detail?.type;

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

        if (!detail.items) {
            return dispatchEvent(event);
        }

        detail.items.forEach((item) => {
            const { id, repo } = item;

            if (!isContentRepo(repo)) {
                return;
            }

            editorFetchAdminContent(id, repo).then((content) => {
                // If the content could not be fetched, or if it was modified by the current user, dispatch the event
                // as normal
                if (!content || content.modifier === userId) {
                    dispatchEvent(event);
                    return;
                }

                // If the content is not the current content in the editor, do nothing
                if (id !== currentContentId || !isCurrentEditorRepo(repo)) {
                    return;
                }

                // If another user (or service call/scheduled task/script/etc) updated the content, we want to prevent
                // an immediate UI-refresh, as this may cause the current user to lose their changes. We show a
                // warning message instead, and give the user an option to dispatch the update event manually
                console.log(
                    `Content was updated by another user (${content.modifier}) - showing warning`
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
            });
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

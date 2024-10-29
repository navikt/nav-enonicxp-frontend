import { logger } from '@/shared/logger';
import {
    editorFetchAdminContent,
    editorFetchAdminUserId,
    editorFetchUserInfo,
    isContentRepo,
    isCurrentEditorRepo,
} from 'components/_editor-only/editor-hacks/editor-hacks-utils';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

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

const getUserNameFromEmail = (email: string) => email.split('@')[0].replace('.', ' ');

const ignoredContentTypes: ReadonlySet<ContentType> = new Set([
    ContentType.GlobalNumberValuesSet,
    ContentType.GlobalCaseTimeSet,
]);

// Hook the dispatchEvent function on the content studio parent window
// in order to prevent certain events from propagating
export const hookDispatchEventForBatchContentServerEvent = async ({
    content,
    setExternalContentChange,
    setExternalUpdateEvent,
    setExternalUserName,
}: {
    content: ContentProps;
    setExternalUserName: (name: string | null) => void;
    setExternalContentChange: (changed: boolean) => void;
    setExternalUpdateEvent: (event: CustomEvent | null) => void;
}) => {
    const { _id: currentContentId, type: contentType } = content;

    // Some content types use a custom editor. This hack only applies to built-in CS functionality
    if (ignoredContentTypes.has(contentType)) {
        return;
    }

    // Keep the original function reference for use in our hook. We put it on the parent window object rather than
    // as a local variable, in order to preserve it after the current frontend instance is destroyed.
    if (!parent.window.dispatchEventActual) {
        parent.window.dispatchEventActual = parent.window.dispatchEvent;
    }

    const dispatchEvent = parent.window.dispatchEventActual;

    const userId = await editorFetchAdminUserId();

    parent.window.dispatchEvent = (event: Event) => {
        if (!(event instanceof CustomEvent)) {
            return dispatchEvent(event);
        }

        const { type: eventType, detail } = event;
        const detailType = detail?.type;

        // We only want to intercept update events of the BatchContentServerEvent type, which is what triggers UI updates
        // for content changes on the client. All other events should be dispatched as normal.
        if (eventType !== 'BatchContentServerEvent' || detailType !== NodeServerChangeType.UPDATE) {
            return dispatchEvent(event);
        }

        // User-triggered events should always be dispatched
        if (detail.userTriggered) {
            logger.info('User-triggered event - dispatching event');
            return dispatchEvent(event);
        }

        // If the current user could not be determined for whatever reason, the following functionality
        // is not very useful.
        // (this probably indicates that the undocumented api used here has changed)
        if (!userId) {
            logger.error('Could not determine the current user - dispatching event');
            return dispatchEvent(event);
        }

        if (!detail.items) {
            return dispatchEvent(event);
        }

        detail.items.forEach((item: { id: string; repo: string }) => {
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
                logger.info(
                    `Content was updated by another user (${content.modifier}) - showing warning`
                );

                editorFetchUserInfo(content.modifier).then((userInfo) => {
                    if (userInfo?.displayName) {
                        setExternalUserName(getUserNameFromEmail(userInfo.displayName));
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

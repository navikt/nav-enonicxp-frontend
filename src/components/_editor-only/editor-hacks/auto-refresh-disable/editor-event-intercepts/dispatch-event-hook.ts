import {
    fetchAdminContent,
    fetchAdminUserId,
    fetchUserInfo,
} from '../../editor-fetch-utils';
import {
    ContentProps,
    ContentType,
} from '../../../../../types/content-props/_content-common';
import {
    batchContentServerEventItemDidUpdate,
    batchContentServerEventItemIsNew,
    NodeServerChangeType,
} from './utils';

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

    // Keep the original function reference for use in our hook. We put it on the parent window object rather than
    // as a local variable, in order to preserve it after the current frontend iframe is destroyed.
    if (!parent.window.dispatchEventActual) {
        parent.window.dispatchEventActual = parent.window.dispatchEvent;
    }

    const dispatchEvent = parent.window.dispatchEventActual;

    let unsavedWorkflowState;
    let savedWorkflowState;
    let userId;

    fetchAdminUserId().then((id) => {
        userId = id;
        console.log(`User id: ${userId}`);
    });

    fetchAdminContent(contentId).then((res) => {
        savedWorkflowState = res?.workflow.state;
        console.log(`Initial workflow state: ${savedWorkflowState}`);
    });

    // Hook the dispatchEvent function so we can prevent certain events from propagating
    parent.window.dispatchEvent = (event: CustomEvent) => {
        const { type, detail } = event;

        console.log(type, detail, detail?.items);

        if (type === 'BeforeContentSavedEvent') {
            fetchAdminContent(contentId).then((content) => {
                unsavedWorkflowState = content?.workflow.state;
                console.log(
                    `Workflow state before: ${content?.workflow.state}`
                );
            });
        }

        if (type === 'AfterContentSavedEvent') {
            fetchAdminContent(contentId).then((content) => {
                console.log(content);
                if (
                    unsavedWorkflowState === 'READY' &&
                    content?.workflow.state === 'READY'
                ) {
                    savedWorkflowState = 'READY';
                }
                console.log(`Workflow state after: ${content?.workflow.state}`);
            });
        }

        // We only want to intercept events of the BatchContentServerEvent type, which is what triggers UI updates
        // for content changes on the client. All other events should be dispatched as normal.
        //
        // If the BatchContentServerEvent is triggered by the user from the warning popup or from newly created
        // content, we also want to dispatch it without further checks.
        //
        // We also dispatch events on global-value-set contentTypes, as this type is updated via a custom editor
        // which doesn't play nice with this functionality.
        if (
            type !== 'BatchContentServerEvent' ||
            detail.userTriggered ||
            batchContentServerEventItemIsNew(detail, contentId) ||
            contentType === ContentType.GlobalValues
        ) {
            console.log(`Dispatching ${type} event`);
            return dispatchEvent(event);
        }

        if (batchContentServerEventItemDidUpdate(detail, contentId)) {
            console.log('Content updated');

            fetchAdminContent(contentId).then((content) => {
                if (!content) {
                    // In the unexpected event that this call fails, just dispatch the event as normal to ensure we
                    // don't break anything :)
                    console.log(
                        'Could not fetch admin content - dispatching event'
                    );
                    dispatchEvent(event);
                } else if (detail.type === NodeServerChangeType.PUBLISH) {
                    console.log('Content published - dispatching event');
                    dispatchEvent(event);
                } else if (detail.type === NodeServerChangeType.DELETE) {
                    console.log('Content unpublished - dispatching event');
                    dispatchEvent(event);
                } else if (content.modifier === userId) {
                    // If the content was modified by the current user, we want to dispatch the event if the
                    // workflow state or publish state was changed. The content itself updates dynamically via our
                    // component-preview api, so UI updates are only needed to keep the state of the
                    // "publish"/"mark as ready" button consistent

                    const newWorkflowState = content.workflow.state;

                    console.log(
                        'Own update detected',
                        newWorkflowState,
                        savedWorkflowState
                    );

                    if (newWorkflowState !== savedWorkflowState) {
                        console.log(
                            `User updated workflow state to ${newWorkflowState} - dispatching event`
                        );
                        savedWorkflowState = newWorkflowState;
                        dispatchEvent(event);
                    }
                } else {
                    // If another user (or service call/scheduled task/etc) updated the content, we never want to
                    // automatically reload, as this may cause the current user to lose their changes. Show a
                    // warning overlay instead, and let the user dispatch the update event manually
                    console.log('External update detected');

                    fetchUserInfo(content.modifier).then((userInfo) => {
                        if (userInfo) {
                            const userNameFormatted = userInfo.displayName
                                ?.split('@')[0]
                                .replace('.', ' ');
                            setExternalUserName(userNameFormatted);
                        }
                        console.log(
                            'External change detected - showing warning'
                        );
                        setExternalContentChange(true);

                        // Save the most recent update event for an eventual user-triggered dispatch
                        if (detail.type === NodeServerChangeType.UPDATE) {
                            setExternalUpdateEvent(event);
                        }
                    });
                }
            });
        } else {
            console.log('Content NOT updated');
        }

        console.log(`Returning false for ${type} event`);

        return false;
    };
};

export const unhookDispatchEvent = () => {
    if (parent.window.dispatchEventActual) {
        parent.window.dispatchEvent = parent.window.dispatchEventActual;
    }
};

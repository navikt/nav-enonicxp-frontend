import { useEffect, useState } from 'react';
import { AlertBox } from '../../../alert-box/AlertBox';
import { EditorLinkWrapper } from '../../editor-link-wrapper/EditorLinkWrapper';
import { LenkeInline } from '../../../lenke/LenkeInline';
import { Branch } from '../../../../../types/branch';
import { BodyLong } from '@navikt/ds-react';
import style from './AutoRefreshDisableHack.module.scss';
import {
    ContentWorkflowState,
    fetchAdminContent,
    fetchAdminUserId,
} from '../editor-fetch-utils';
import {
    ContentProps,
    ContentType,
} from '../../../../../types/content-props/_content-common';

/*
 * Prevent unnecessary reloads of the frontend iframe and component editor. This may happen when the content is changed
 * by the current user, or by other users, or programmatically via a task or service. This behaviour makes for a
 * confusing user experience, and may sometimes cause the user to lose their unsaved work.
 *
 * When external changes are detected, we show an alert-box which notifies of changes having occured, and offer a
 * manual reload option instead.
 *
 * */

// From lib-admin-ui
enum NodeServerChangeType {
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

type ContentItem = {
    id: string;
    branch: Branch;
    path: {
        refString: string;
    };
};

type BatchContentServerEventDetail = {
    type: NodeServerChangeType;
    items?: ContentItem[];
    // We add this field to the event detail when an event should be
    // dispatched on behalf of the user via the alertbox dialog
    userTriggered?: true;
};

const contentDidUpdate = (
    eventDetail: BatchContentServerEventDetail,
    contentId: string
) =>
    eventDetail?.items?.some(
        (item) =>
            item.id === contentId &&
            (item.branch === 'draft' ||
                eventDetail.type === NodeServerChangeType.PUBLISH)
    );

// New content objects are named '__unnamed__<uuid>' before they are given an actual
// name in the editor. We check for this to ensure events are dispatched correctly for
// newly created contents
const contentNamePlaceholderPrefix = '__unnamed__';

const contentIsNew = (
    eventDetail: BatchContentServerEventDetail,
    contentId: string
) =>
    eventDetail?.items?.some(
        (item) =>
            item.id === contentId &&
            item.path.refString.includes(contentNamePlaceholderPrefix)
    );

type Props = {
    content: ContentProps;
};

export const AutoRefreshDisableHack = ({ content }: Props) => {
    const { _id: contentId, __typename: contentType } = content;

    const [externalUpdateEvent, setExternalUpdateEvent] =
        useState<CustomEvent | null>(null);
    const [externalContentChange, setExternalContentChange] =
        useState<NodeServerChangeType | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [workflowState, setWorkflowState] =
        useState<ContentWorkflowState | null>(null);

    useEffect(() => {
        fetchAdminUserId().then((id) => {
            console.log(`User id: ${id}`);
            setUserId(id);
        });

        fetchAdminContent(contentId).then((res) => {
            const _workflowState = res?.workflow.state;
            console.log(`Initial workflow state: ${_workflowState}`);
            setWorkflowState(_workflowState);
        });
    }, [contentId]);

    useEffect(() => {
        if (!userId || !workflowState) {
            return;
        }

        // Keep the original function reference for use in our hook. We put it on the parent window object rather than
        // as a local variable, in order to preserve it after the current frontend iframe is destroyed.
        if (!parent.window.dispatchEventActual) {
            parent.window.dispatchEventActual = parent.window.dispatchEvent;
        }

        const dispatchEvent = parent.window.dispatchEventActual;

        // Hook the dispatchEvent function so we can prevent certain events from propagating
        parent.window.dispatchEvent = (event: CustomEvent) => {
            const { type, detail } = event;

            console.log(type, detail);

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
                contentIsNew(detail, contentId) ||
                contentType === ContentType.GlobalValues
            ) {
                return dispatchEvent(event);
            }

            if (contentDidUpdate(detail, contentId)) {
                fetchAdminContent(contentId).then((res) => {
                    if (!res) {
                        // In the unexpected event that this call fails, just dispatch the event as normal to ensure we
                        // don't break anything :)
                        console.log(
                            'Could not fetch admin content - dispatching event'
                        );
                        dispatchEvent(event);
                    } else if (res.modifier === userId) {
                        // If the content was modified by the current user, we want to dispatch the event if the
                        // workflow state or publish state was changed. The content itself updates dynamically via our
                        // component-preview api, so UI updates are only needed to keep the state of the
                        // "publish"/"mark as ready" button consistent

                        const newWorkflowState = res.workflow.state;

                        if (detail.type === NodeServerChangeType.PUBLISH) {
                            console.log(
                                'User published content - dispatching event'
                            );
                            dispatchEvent(event);
                        } else if (newWorkflowState !== workflowState) {
                            console.log(
                                `User updated workflow state to ${newWorkflowState} - dispatching event`
                            );
                            setWorkflowState(newWorkflowState);
                            dispatchEvent(event);
                        }
                    } else {
                        // If another user (or service call/scheduled task/etc) updated the content, we never want to
                        // automatically reload, as this may cause the current user to lose their changes. Show a
                        // a warning overlay instead, and let the user dispatch the update event manually

                        console.log(
                            'External change detected - showing warning'
                        );
                        setExternalContentChange(detail.type);

                        // Save the most recent update event for an eventual user-triggered dispatch
                        if (detail.type === NodeServerChangeType.UPDATE) {
                            setExternalUpdateEvent(event);
                        }
                    }
                });
            }

            return false;
        };
    }, [contentId, contentType, userId, workflowState]);

    return externalContentChange ? (
        <div className={style.warningWrapper}>
            <AlertBox
                variant={
                    externalContentChange === NodeServerChangeType.PUBLISH
                        ? 'success'
                        : 'warning'
                }
                size={'small'}
            >
                <BodyLong>
                    {`Innhold på siden ble ${
                        externalContentChange === NodeServerChangeType.PUBLISH
                            ? 'publisert'
                            : 'endret'
                    } av noen andre. `}
                    <EditorLinkWrapper>
                        <LenkeInline
                            href={'#'}
                            onClick={(e) => {
                                e.preventDefault();
                                setExternalContentChange(undefined);
                                if (externalUpdateEvent) {
                                    externalUpdateEvent.detail.userTriggered =
                                        true;
                                    parent.window.dispatchEvent(
                                        externalUpdateEvent
                                    );
                                }
                            }}
                        >
                            {'Last inn på nytt'}
                        </LenkeInline>
                    </EditorLinkWrapper>
                    {' for å se endringene.'}
                </BodyLong>
            </AlertBox>
        </div>
    ) : null;
};

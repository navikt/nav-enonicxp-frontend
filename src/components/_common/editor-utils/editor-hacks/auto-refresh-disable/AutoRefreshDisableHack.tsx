import { useEffect, useState } from 'react';
import { AlertBox } from '../../../alert-box/AlertBox';
import { EditorLinkWrapper } from '../../editor-link-wrapper/EditorLinkWrapper';
import { LenkeInline } from '../../../lenke/LenkeInline';
import { Branch } from '../../../../../types/branch';
import { fetchCsContentApi } from '../EditorHacks';
import { BodyLong } from '@navikt/ds-react';
import style from './AutoRefreshDisableHack.module.scss';

/*
 * Prevent unnecessary reloads of the frontend iframe and component editor. This may happen when the content is changed
 * by the current user, or by other users, or programmatically via a task or service. This behaviour makes for a
 * confusing user experience, and may sometimes cause the user to lose their unsaved work.
 *
 * When external changes are detected, we show an alert-box which notifies of changes having occured, and offer a
 * manual reload option.
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

// Incomplete type, only the fields we use are specified here
type BatchContentServerEventDetail = {
    type: NodeServerChangeType;
    items?: ContentItem[];
    // We add this field to the event detail when an event should be
    // dispatched on behalf of the user via the alertbox dialog
    userTriggered?: true;
};

const currentContentDraftDidUpdate = (
    eventDetail: BatchContentServerEventDetail,
    contentId: string
) =>
    eventDetail?.items?.some(
        (item) => item.id === contentId && item.branch === 'draft'
    );

// New content objects are named '__unnamed__<uuid>' before they are given an actual
// name in the editor. We check for this to ensure events are dispatched correctly for
// newly created contents
const contentNamePlaceholderPrefix = '__unnamed__';

// We only want this event to dispatch immediately if it includes the current content AND the event was either triggered
// by the user, OR from a publish action, OR if the content was newly created
const shouldDispatchBatchContentServerEvent = (
    eventDetail: BatchContentServerEventDetail,
    contentId: string
) =>
    eventDetail?.items?.some(
        (item) =>
            item.id === contentId &&
            (eventDetail.type === NodeServerChangeType.PUBLISH ||
                eventDetail.userTriggered ||
                item.path.refString.includes(contentNamePlaceholderPrefix))
    );

type Props = {
    contentId: string;
};

export const AutoRefreshDisableHack = ({ contentId }: Props) => {
    // Save the most recent BatchContentServerEvent from external changes, so we can dispatch this if the user wants
    // to trigger it manually
    const [lastExternalEvent, setLastExternalEvent] = useState<CustomEvent>();
    const [contentUpdated, setContentUpdated] = useState(false);

    useEffect(() => {
        // Keep the original function reference for use in our hook. We put it on the parent window object rather than
        // as a local variable, in order to preserve it after the current frontend iframe is destroyed.
        if (!parent.window.dispatchEventActual) {
            parent.window.dispatchEventActual = parent.window.dispatchEvent;
        }

        let userHasCommitedChanges = false;
        let prevWorkflowState;

        fetchCsContentApi(contentId).then((res) => {
            const workflowState = res?.workflow.state;
            if (workflowState !== prevWorkflowState) {
                prevWorkflowState = workflowState;
            }
        });

        // Hook the dispatchEvent function so we can prevent certain events from propagating
        parent.window.dispatchEvent = (event: CustomEvent) => {
            const { type, detail } = event;

            // This event is triggered by Content Studio whenever an operation is performed on content on the server.
            // On the client side, this causes the CS UI to refresh for certain operations. We generally don't want
            // this refresh to happen, except when it is necessary for updating the workflow state in the UI
            if (type === 'BatchContentServerEvent') {
                fetchCsContentApi(contentId).then((res) => {
                    if (
                        !res ||
                        shouldDispatchBatchContentServerEvent(detail, contentId)
                    ) {
                        return parent.window.dispatchEventActual(event);
                    }

                    // If the user commited their changes, we want to dispatch the event if the workflow state changed,
                    // in order to trigger the UI update for showing the correct publishing action ("Mark as ready" etc)
                    if (userHasCommitedChanges) {
                        userHasCommitedChanges = false;
                        const workflowState = res.workflow.state;

                        if (workflowState !== prevWorkflowState) {
                            prevWorkflowState = workflowState;
                            console.log(
                                'Workflow state changed, dispatching last BatchContentServerEvent'
                            );
                            return parent.window.dispatchEventActual(event);
                        }
                    } else if (
                        // global-value-set is modified with a custom editor and does not trigger the
                        // usual AfterContentSavedEvent
                        res.type !== 'no.nav.navno:global-value-set' &&
                        currentContentDraftDidUpdate(detail, contentId)
                    ) {
                        console.log(
                            'External content update detected - showing warning'
                        );
                        setContentUpdated(true);
                        setLastExternalEvent(event);
                    }
                });

                return false;
            }

            // This event is triggered after the current user has commited their changes, either via applying changes
            // to a component, or marking the content as ready, or publishing the content
            if (
                type === 'AfterContentSavedEvent' ||
                type === 'ContentPublishPromptEvent'
            ) {
                console.log(
                    'Changes were committed, checking next BatchContentServerEvent'
                );
                userHasCommitedChanges = true;
            }

            return parent.window.dispatchEventActual(event);
        };
    }, [contentId]);

    return (
        contentUpdated && (
            <div className={style.warningWrapper}>
                <AlertBox variant={'warning'} size={'small'}>
                    <BodyLong>
                        {'Innhold på siden ble endret av noen andre.'}
                        <EditorLinkWrapper>
                            <LenkeInline
                                className={style.link}
                                href={'#'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setContentUpdated(false);
                                    if (lastExternalEvent) {
                                        lastExternalEvent.detail.userTriggered =
                                            true;
                                        parent.window.dispatchEvent(
                                            lastExternalEvent
                                        );
                                    }
                                }}
                            >
                                {'Last inn på nytt'}
                            </LenkeInline>
                        </EditorLinkWrapper>
                        {'for å se endringene.'}
                    </BodyLong>
                </AlertBox>
            </div>
        )
    );
};

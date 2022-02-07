import { useEffect, useState } from 'react';
import { AlertBox } from '../../../alert-box/AlertBox';
import { EditorLinkWrapper } from '../../editor-link-wrapper/EditorLinkWrapper';
import { Button } from '../../../button/Button';
import { ClearIcon } from '../../../../pages/error-page/errorcode-content/clear-icon/ClearIcon';
import { LenkeInline } from '../../../lenke/LenkeInline';
import { Branch } from '../../../../../types/branch';
import { fetchCsContentApi, ContentWorkflowState } from '../EditorHacks';
import style from './AutoRefreshDisableHack.module.scss';

type BatchContentServerEventDetail = {
    items?: Array<{ id: string; branch: Branch }>;
    alwaysAllow?: boolean;
};

const currentContentDraftDidUpdate = (
    detail: BatchContentServerEventDetail,
    contentId: string
) =>
    detail &&
    !detail.alwaysAllow &&
    detail.items?.some(
        (item) => item.id === contentId && item.branch === 'draft'
    );

const fetchWorkflowState = async (
    contentId: string
): Promise<ContentWorkflowState | null> =>
    fetchCsContentApi(contentId).then((json) => json.workflow.state);

/*
 * Prevents refresh of the frontend iframe and component editor when changes are
 * made by other editor users, or programmatically. This behaviour makes for a
 * confusing user experience, and may cause the user to lose their unsaved work.
 *
 * Instead of refreshing the view automatically, we show an alert-box which
 * notifies of changes having occured, and offers a manual refresh option.
 *
 * */

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

        let checkNextEvent = false;
        let prevWorkflowState;

        fetchWorkflowState(contentId).then((workflowState) => {
            if (workflowState) {
                prevWorkflowState = workflowState;
            }
        });

        // Hook the dispatchEvent function so we can prevent certain events from propagating
        parent.window.dispatchEvent = (event: CustomEvent) => {
            const { type, detail } = event;

            console.log(event);

            // This event is triggered by Content Studio whenever an operation is performed on content on the server.
            // On the client side, this causes the CS UI to refresh for certain operations. We generally don't want
            // this refresh to happen, except when it is necessary for updating the workflow state in the UI
            if (type === 'BatchContentServerEvent' && !detail.alwaysAllow) {
                if (checkNextEvent) {
                    checkNextEvent = false;

                    fetchWorkflowState(contentId).then((workflowState) => {
                        console.log('Workflow state: ', workflowState);

                        // If the workflow state has changed, we must dispatch the event in order to trigger an UI
                        // update for showing the correct publishing action ("Mark as ready" etc)
                        if (
                            workflowState &&
                            workflowState !== prevWorkflowState
                        ) {
                            prevWorkflowState = workflowState;
                            console.log(
                                'Workflow state changed, dispatching last BatchContentServerEvent'
                            );
                            return parent.window.dispatchEventActual(event);
                        }
                    });
                } else if (currentContentDraftDidUpdate(detail, contentId)) {
                    console.log(
                        'External content update detected - showing warning'
                    );
                    setContentUpdated(true);
                    setLastExternalEvent(event);
                }

                return false;
            }

            // This event is triggered after the current user has saved their content, either via applying changes to
            // a component, or marking the content as ready
            if (type === 'AfterContentSavedEvent') {
                console.log(
                    'Content saved, checking next BatchContentServerEvent event'
                );
                checkNextEvent = true;
            }

            return parent.window.dispatchEventActual(event);
        };
    }, []);

    return (
        contentUpdated && (
            <div className={style.warningWrapper}>
                <AlertBox variant={'warning'} size={'small'}>
                    {'Innhold på siden ble endret av noen andre.'}
                    <EditorLinkWrapper>
                        <LenkeInline
                            className={style.link}
                            href={'#'}
                            onClick={(e) => {
                                e.preventDefault();
                                setContentUpdated(false);
                                if (lastExternalEvent) {
                                    lastExternalEvent.detail.alwaysAllow = true;
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
                    <EditorLinkWrapper>
                        <Button
                            variant={'tertiary'}
                            onClick={() => {
                                setContentUpdated(false);
                            }}
                        >
                            <ClearIcon />
                        </Button>
                    </EditorLinkWrapper>
                </AlertBox>
            </div>
        )
    );
};

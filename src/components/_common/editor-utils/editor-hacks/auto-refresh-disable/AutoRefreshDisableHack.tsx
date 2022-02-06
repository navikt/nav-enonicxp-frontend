import { useEffect, useState } from 'react';
import { AlertBox } from '../../../alert-box/AlertBox';
import { EditorLinkWrapper } from '../../editor-link-wrapper/EditorLinkWrapper';
import { Button } from '../../../button/Button';
import { ClearIcon } from '../../../../pages/error-page/errorcode-content/clear-icon/ClearIcon';
import { LenkeInline } from '../../../lenke/LenkeInline';
import { Branch } from '../../../../../types/branch';
import style from './AutoRefreshDisableHack.module.scss';

type BatchContentServerEventDetail = {
    items?: Array<{ id: string; branch: Branch }>;
    alwaysAllow?: boolean;
};

const currentContentDraftDidUpdate = (
    detail: BatchContentServerEventDetail,
    contentId: string
) =>
    !detail.alwaysAllow &&
    detail?.items?.some(
        (item) => item.id === contentId && item.branch === 'draft'
    );

type Props = {
    contentId: string;
};

/*
 * Prevents refresh of the frontend iframe and component editor when changes are
 * made by other editor users, or programmatically. This behaviour makes for a
 * confusing user experience, and may cause the user to lose their unsaved work.
 *
 * Instead of refreshing the view automatically, we show an alert-box which
 * notifies of changes having occured, and offers a manual refresh option.
 *
 * */

export const AutoRefreshDisableHack = ({ contentId }: Props) => {
    // Save the most recent BatchContentServerEvent, so we can dispatch this if
    // the user wants to trigger it manually
    const [lastEvent, setLastEvent] = useState<CustomEvent>();

    const [contentUpdated, setContentUpdated] = useState(false);

    // Hook the parent window's event dispatch function
    useEffect(() => {
        // Keep the original function reference for use in our hook. We put it on
        // the parent window object rather than as a local variable, in order to
        // preserve it after the current frontend iframe is destroyed.
        if (!parent.window.dispatchEventActual) {
            parent.window.dispatchEventActual = parent.window.dispatchEvent;
        }

        const parentLog = parent.window.console.log;

        let allowNextEvent = false;

        parent.window.dispatchEvent = (event: CustomEvent) => {
            const { type, detail } = event;

            // This event is triggered by Content Studio whenever an operation
            // is performed on content on the server. On the client side, this
            // causes the CS UI to refresh for certain operations.
            if (type === 'BatchContentServerEvent') {
                if (allowNextEvent) {
                    parentLog('BatchContentServerEvent allowed');
                    allowNextEvent = false;
                } else if (currentContentDraftDidUpdate(detail, contentId)) {
                    parentLog('BatchContentServerEvent blocked');

                    setContentUpdated(true);
                    setLastEvent(event);

                    return false;
                }
            }

            // This event is triggered when the current user commits their changes
            // ('Mark as ready'). We now want to let the next BatchContentServerEvent
            // through, in order to trigger the expected Content Studio UI response
            if (type === 'BeforeContentSavedEvent') {
                parentLog('Allowing next event');
                allowNextEvent = true;
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
                                if (lastEvent) {
                                    lastEvent.detail.alwaysAllow = true;
                                    parent.window.dispatchEvent(lastEvent);
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

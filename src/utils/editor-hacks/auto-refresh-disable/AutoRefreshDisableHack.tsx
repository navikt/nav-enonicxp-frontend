import { useEffect, useState } from 'react';
import { AlertBox } from '../../../components/_common/alert-box/AlertBox';
import { EditorLinkWrapper } from '../../../components/_common/editor-utils/editor-link-wrapper/EditorLinkWrapper';
import { Button } from '../../../components/_common/button/Button';
import { ClearIcon } from '../../../components/pages/error-page/errorcode-content/clear-icon/ClearIcon';
import { LenkeInline } from '../../../components/_common/lenke/LenkeInline';
import { Branch } from '../../../types/branch';
import style from './AutoRefreshDisableHack.module.scss';

type BatchContentServerEventDetail = {
    name: 'BatchContentServerEvent';
    items?: Array<{ id: string; branch: Branch }>;
    alwaysAllow?: boolean;
};

const contentDraftDidUpdate = (
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

/* Prevents refresh of the frontend iframe and component editor when changes are
 * made by other editors or programmatically. Instead of refreshing the view, we
 * show an alert-box which notifies of changes having occured, and offers a
 * manual refresh option.
 *
 * */

export const AutoRefreshDisableHack = ({ contentId }: Props) => {
    // Save the most recent event, so we can dispatch this if the user wants to
    // trigger it later
    const [lastEvent, setLastEvent] = useState<CustomEvent>();

    // If the content was updated by another user, we want to show a warning
    // to the current user, with an option to trigger the event manually
    const [contentUpdated, setContentUpdated] = useState(false);

    useEffect(() => {
        // Hook the parent window's event dispatch function, but preserve
        // the original function for use in our hook.
        if (!parent.window.dispatchEventActual) {
            parent.window.dispatchEventActual = parent.window.dispatchEvent;
        }

        let allowNextEvent = false;

        parent.window.dispatchEvent = (event: CustomEvent) => {
            const { type, detail } = event;

            if (type === 'BatchContentServerEvent') {
                if (allowNextEvent) {
                    parent.window.console.log('Event allowed');
                    allowNextEvent = false;
                } else if (contentDraftDidUpdate(detail, contentId)) {
                    parent.window.console.log('Event blocked');

                    setContentUpdated(true);
                    setLastEvent(event);

                    return false;
                }
            }

            // When the current user makes a change of their own, we want to let the
            // next BatchContentServerEvent through, in order to trigger the expected
            // Content Studio UI response
            if (type === 'BeforeContentSavedEvent') {
                parent.window.console.log('Allowing next event');
                allowNextEvent = true;
            }

            return parent.window.dispatchEventActual(event);
        };
    }, []);

    return (
        contentUpdated && (
            <div className={style.warningWrapper}>
                <AlertBox variant={'advarsel'} size={'small'}>
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

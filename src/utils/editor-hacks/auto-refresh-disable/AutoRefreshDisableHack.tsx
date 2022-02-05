import { useEffect, useState } from 'react';
import { AlertBox } from '../../../components/_common/alert-box/AlertBox';
import { EditorLinkWrapper } from '../../../components/_common/editor-utils/editor-link-wrapper/EditorLinkWrapper';
import { Button } from '../../../components/_common/button/Button';
import style from './AutoRefreshToggle.module.scss';
import { ClearIcon } from '../../../components/pages/error-page/errorcode-content/clear-icon/ClearIcon';
import { LenkeInline } from '../../../components/_common/lenke/LenkeInline';

const currentContentDidUpdate = (
    detail: CustomEvent['detail'],
    contentId: string
) => detail?.items?.some((item) => item.id === contentId);

type Props = {
    contentId: string;
};

// Prevents refresh of the frontend iframe and component editor from being
// triggered by changes made by other editors
export const AutoRefreshDisableHack = ({ contentId }: Props) => {
    // When the current user makes a change of their own, we want to let the
    // next BatchContentServerEvent through, in order to trigger the expected
    // content studio UI response
    const [allowNextBatchContentEvent, setAllowNextBatchContentEvent] =
        useState(false);

    // Save the most recent event, so we can dispatch this if the user wants to
    // trigger it later
    const [lastBatchContentEvent, setLastBatchContentEvent] =
        useState<CustomEvent>();

    // If the content was updated by another user, we want to show a warning
    // to the current user, with an option to trigger the event manually
    const [contentUpdated, setContentUpdated] = useState(false);

    useEffect(() => {
        const dispatchEvent = parent.window.dispatchEvent;

        parent.window.dispatchEvent = (event: CustomEvent) => {
            const { type, detail } = event;
            console.log(event);

            if (type === 'BatchContentServerEvent') {
                if (allowNextBatchContentEvent || detail.alwaysAllow) {
                    console.log('Event allowed');
                    setAllowNextBatchContentEvent(false);
                } else {
                    console.log('Event blocked');

                    if (currentContentDidUpdate(detail, contentId)) {
                        setContentUpdated(true);
                        setLastBatchContentEvent(event);
                    }

                    return false;
                }
            }

            if (type === 'BeforeContentSavedEvent') {
                console.log('Allowing next event');
                setAllowNextBatchContentEvent(true);
            }

            return dispatchEvent(event);
        };

        return () => {
            parent.window.dispatchEvent = dispatchEvent;
        };
    }, [allowNextBatchContentEvent]);

    return (
        contentUpdated && (
            <div className={style.warningWrapper}>
                <AlertBox variant={'advarsel'} size={'small'}>
                    {'Innhold på siden ble endret av en annen redaktør.'}
                    <EditorLinkWrapper>
                        <LenkeInline
                            className={style.link}
                            href={'#'}
                            onClick={(e) => {
                                e.preventDefault();
                                if (lastBatchContentEvent) {
                                    lastBatchContentEvent.detail.alwaysAllow =
                                        true;
                                    parent.window.dispatchEvent(
                                        lastBatchContentEvent
                                    );
                                }
                            }}
                        >
                            {'Last inn på nytt'}
                        </LenkeInline>
                    </EditorLinkWrapper>
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

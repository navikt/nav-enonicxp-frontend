import { BodyLong } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { AlertBox } from 'components/_common/alertBox/AlertBox';
import { EditorLinkWrapper } from 'components/_editor-only/editorLinkWrapper/EditorLinkWrapper';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { ContentProps } from 'types/content-props/_content-common';
import { isEditorFeatureEnabled } from 'components/_editor-only/site-info/feature-toggles/editor-feature-toggles-utils';
import { EditorFeature } from 'components/_editor-only/site-info/feature-toggles/SiteInfoFeatureToggles';
import {
    hookDispatchEventForBatchContentServerEvent,
    unhookDispatchEventForBatchContentServerEvent,
} from './dispatch-event-hook';

import style from './AutoRefreshDisableHack.module.scss';

/*
 * Prevent unnecessary reloads of the frontend iframe and component editor. This may happen when the content is changed
 * by the current user, or by other users, or via a task or service. This behaviour makes for a confusing user
 * experience, and may sometimes cause the user to lose their unsaved work.
 *
 * When external changes are detected, we show an alert-box which notifies of changes having occured, and offer a
 * manual reload option instead.
 *
 * Note: This is very scary and may break things! :D
 *
 * */

type Props = {
    content: ContentProps;
};

export const AutoReloadDisableHack = ({ content }: Props) => {
    const [externalUpdateEvent, setExternalUpdateEvent] = useState<CustomEvent | null>(null);
    const [externalContentChange, setExternalContentChange] = useState<boolean>(false);
    const [externalUserName, setExternalUserName] = useState<string | null>(null);

    useEffect(() => {
        hookDispatchEventForBatchContentServerEvent({
            content,
            setExternalUpdateEvent,
            setExternalUserName,
            setExternalContentChange,
        });

        return unhookDispatchEventForBatchContentServerEvent;
    }, [content]);

    if (!externalContentChange || !isEditorFeatureEnabled(EditorFeature.ContentModifiedWarning)) {
        return null;
    }

    return (
        <div className={style.warningWrapper}>
            <AlertBox variant={'warning'} size={'small'}>
                <BodyLong>
                    {`OBS! ${
                        externalUserName || 'Noen andre'
                    } redigerte denne siden nå. Hvis du gjør endringer, vil du overskrive det som allerede er gjort. Du bør vente med å redigere siden til den andre har avsluttet. `}
                    <EditorLinkWrapper>
                        <LenkeInline
                            href={'#'}
                            onClick={(e) => {
                                e.preventDefault();
                                setExternalContentChange(false);
                                if (externalUpdateEvent) {
                                    externalUpdateEvent.detail.userTriggered = true;
                                    parent.window.dispatchEvent(externalUpdateEvent);
                                }
                            }}
                        >
                            {'Last inn på nytt'}
                        </LenkeInline>
                    </EditorLinkWrapper>
                    {' for å se endringer.'}
                </BodyLong>
            </AlertBox>
        </div>
    );
};

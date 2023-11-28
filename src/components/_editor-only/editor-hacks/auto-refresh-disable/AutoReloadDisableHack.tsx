import { AlertBox } from '../../../_common/alert-box/AlertBox';
import { EditorLinkWrapper } from '../../editor-link-wrapper/EditorLinkWrapper';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';
import { BodyLong } from '@navikt/ds-react';
import { ContentProps } from 'types/content-props/_content-common';
import { useEffect, useState } from 'react';
import {
    hookDispatchEventForBatchContentServerEvent,
    unhookDispatchEventForBatchContentServerEvent,
} from './dispatch-event-hook';
import { isEditorFeatureEnabled } from 'components/_editor-only/site-info/feature-toggles/editor-feature-toggles-utils';
import { EditorFeature } from 'components/_editor-only/site-info/feature-toggles/SiteInfoFeatureToggles';

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
    const [externalUpdateEvent, setExternalUpdateEvent] =
        useState<CustomEvent | null>(null);
    const [externalContentChange, setExternalContentChange] =
        useState<boolean>(false);
    const [externalUserName, setExternalUserName] = useState<string | null>(
        null
    );

    useEffect(() => {
        hookDispatchEventForBatchContentServerEvent({
            content,
            setExternalUpdateEvent,
            setExternalUserName,
            setExternalContentChange,
        });

        return unhookDispatchEventForBatchContentServerEvent;
    }, [content]);

    if (
        !externalContentChange ||
        !isEditorFeatureEnabled(EditorFeature.ContentModifiedWarning)
    ) {
        return null;
    }

    return (
        <div className={style.warningWrapper}>
            <AlertBox variant={'warning'} size={'small'}>
                <BodyLong>
                    {`OBS! ${
                        externalUserName || 'Noen andre'
                    } redigerte denne siden nå. Hvis du gjør endringer, vil du overskrive det som allerede er gjort. `}
                    <EditorLinkWrapper>
                        <LenkeInline
                            href={'#'}
                            onClick={(e) => {
                                e.preventDefault();
                                setExternalContentChange(false);
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
                    {' for å se endringer.'}
                </BodyLong>
            </AlertBox>
        </div>
    );
};

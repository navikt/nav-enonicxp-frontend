import React from 'react';
import { SiteInfoContentProps } from '../../types';
import { BodyShort, Heading } from '@navikt/ds-react';
import { LenkeInline } from '../../../../_common/lenke/LenkeInline';
import {
    adminOrigin,
    editorPathPrefix,
    stripXpPathPrefix,
} from '../../../../../utils/urls';
import dayjs from 'dayjs';
import { formatDateTime } from '../../../../../utils/datetime';
import { WarningFilled } from '@navikt/ds-icons';

import style from './SiteInfoPublishInfoItem.module.scss';
import { SiteInfoEditorLink } from '../../_common/editor-link/SiteInfoEditorLink';

export const SiteInfoPublishInfoItem = ({
    type,
    id,
    path,
    customPath,
    publish,
    displayName,
}: SiteInfoContentProps) => {
    const isPrepublish = dayjs().diff(dayjs(publish.from)) < 0;

    return (
        <div className={style.wrapper}>
            <div className={style.nameWrapper}>
                <Heading level={'3'} size={'small'} className={style.name}>
                    {displayName}
                </Heading>
                <BodyShort>
                    <SiteInfoEditorLink id={id} />
                </BodyShort>
            </div>
            <BodyShort size={'small'}>
                {`${stripXpPathPrefix(path)}${
                    customPath ? ` (kort-url: ${customPath})` : ''
                } `}
            </BodyShort>
            <BodyShort size={'small'}>
                {`${type.replace('no.nav.navno:', '')} `}
            </BodyShort>
            <BodyShort className={style.publish}>
                {`${
                    isPrepublish ? 'Publiseres' : 'Publisert'
                }: ${formatDateTime(publish.from)}`}
                {publish.to
                    ? ` - Avpubliseres: ${formatDateTime(publish.to)}`
                    : ''}
            </BodyShort>
            {((isPrepublish && !publish.scheduledFrom) ||
                (publish.to && !publish.scheduledTo)) && (
                <BodyShort className={style.warning} size={'small'}>
                    <WarningFilled />
                    {'Schedule for publisering mangler!'}
                </BodyShort>
            )}
        </div>
    );
};

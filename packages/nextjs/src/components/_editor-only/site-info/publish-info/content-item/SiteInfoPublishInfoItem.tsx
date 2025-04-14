import React from 'react';
import dayjs from 'dayjs';
import { BodyShort, Heading } from '@navikt/ds-react';
import { ExclamationmarkTriangleFillIcon } from '@navikt/aksel-icons';
import { SiteInfoContentProps } from 'components/_editor-only/site-info/types';
import { stripXpPathPrefix } from 'utils/urls';
import { formatDateTime } from 'utils/datetime';
import { SiteInfoLink } from 'components/_editor-only/site-info/_common/links/SiteInfoLink';

import style from './SiteInfoPublishInfoItem.module.scss';

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
                    {isPrepublish ? (
                        displayName
                    ) : (
                        <SiteInfoLink target={'live'} path={customPath ?? path}>
                            {displayName}
                        </SiteInfoLink>
                    )}
                </Heading>
                <BodyShort size={'small'}>
                    <SiteInfoLink target={'editor'} id={id} />
                </BodyShort>
            </div>
            <BodyShort size={'small'}>
                {`${stripXpPathPrefix(path)}${customPath ? ` (kort-url: ${customPath})` : ''} `}
            </BodyShort>
            <BodyShort className={style.publish}>
                {`Type: ${type.replace('no.nav.navno:', '')} - ${
                    isPrepublish ? 'Publiseres' : 'Publisert'
                }: ${
                    publish.from ? formatDateTime(publish.from) : '[ingen publiseringsdato angitt]'
                }`}
                {publish.to ? ` - Avpubliseres: ${formatDateTime(publish.to)}` : ''}
            </BodyShort>
            {((isPrepublish && !publish.scheduledFrom) || (publish.to && !publish.scheduledTo)) && (
                <BodyShort className={style.warning} size={'small'}>
                    <ExclamationmarkTriangleFillIcon />
                    {'Schedule for publisering mangler!'}
                </BodyShort>
            )}
        </div>
    );
};

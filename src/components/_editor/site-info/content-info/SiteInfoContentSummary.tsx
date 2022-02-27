import React from 'react';
import { SiteInfoContentSummaryProps } from '../types';
import { BodyShort, Heading } from '@navikt/ds-react';
import { LenkeInline } from '../../../_common/lenke/LenkeInline';

import style from './SiteInfoContentSummary.module.scss';
import {
    adminOrigin,
    editorPathPrefix,
    stripXpPathPrefix,
} from '../../../../utils/urls';
import dayjs from 'dayjs';
import { formatDateTime } from '../../../../utils/datetime';

const editorUrl = `${adminOrigin}${editorPathPrefix}`;

type Props = SiteInfoContentSummaryProps;

export const SiteInfoContentSummary = ({
    type,
    id,
    path,
    customPath,
    publish,
    displayName,
}: Props) => {
    const isPrepublish = dayjs().diff(dayjs(publish.from)) < 0;

    return (
        <div className={style.wrapper}>
            <div className={style.nameWrapper}>
                <Heading level={'3'} size={'small'} className={style.name}>
                    {displayName}
                </Heading>
                <BodyShort>
                    <LenkeInline href={`${editorUrl}/${id}`} target={'_blank'}>
                        {'[Åpne i editor]'}
                    </LenkeInline>
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
                }: ${formatDateTime(publish.from)}${
                    publish.to
                        ? ` - Avpubliseres: ${formatDateTime(publish.to)}`
                        : ''
                }`}
            </BodyShort>
        </div>
    );
};

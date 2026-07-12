import React from 'react';
import { BodyLong } from '@navikt/ds-react';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { PictogramsProps } from 'types/content-props/pictograms';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { LenkeInline } from 'components/_common/lenke/lenkeInline/LenkeInline';
import { classNames } from 'utils/classnames';
import style from './TjenesterOversiktPanel.module.scss';

type Props = {
    title: string;
    url: string;
    ingress?: string;
    illustration?: PictogramsProps;
    variant?: 'oversikt' | 'situationPage';
};

export const TjenesterOversiktPanel = ({
    title,
    url,
    ingress,
    illustration,
    variant = 'oversikt',
}: Props) => {
    return (
        <div
            className={classNames(
                style.tjenesterPanel,
                variant === 'situationPage' && style.situationPage
            )}
        >
            {illustration && (
                <IllustrationStatic illustration={illustration} className={style.icon} />
            )}
            <LenkeInline href={url} title={title} className={style.title}>
                {title}
            </LenkeInline>
            {ingress && <BodyLong className={style.ingress}>{ingress}</BodyLong>}
            <ArrowRightIcon title="Pil høyre" className={style.arrow} />
        </div>
    );
};

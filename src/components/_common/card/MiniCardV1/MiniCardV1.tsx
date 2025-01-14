import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { PictogramsProps } from 'types/content-props/pictograms';
import { CardSize, CardType } from 'types/card';
import { Illustration } from 'components/_common/illustration/Illustration';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { LinkProps } from 'types/link-props';
import { useCard } from 'components/_common/card/useCard';

import sharedStyle from 'components/_common/card//Card.module.scss';
import style from './MiniCardV1.module.scss';

export type MiniKortProps = {
    illustration?: PictogramsProps;
    link: LinkProps;
    type: CardType;
    header?: string;
    className?: string;
    tryFallbackIllustration?: boolean;
};

export const MiniCardV1 = (props: MiniKortProps) => {
    const { link, illustration, type, header, className, tryFallbackIllustration } = props;
    const { text } = link;
    const { userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Mini,
        link,
    });

    return (
        <>
            {header && (
                <BodyShort size={'medium'} className={style.header}>
                    {header}
                </BodyShort>
            )}
            <div {...userEventProps} className={classNames(sharedStyle.card, className)}>
                <div className={classNames(sharedStyle.bed, style.mini, type)}>
                    <Illustration
                        className={style.illustration}
                        illustration={illustration}
                        tryFallbackIllustration={tryFallbackIllustration}
                    />
                    <LenkeBase
                        className={classNames(sharedStyle.lenkeBaseOverride, style.title)}
                        href={link.url}
                        {...analyticsProps}
                    >
                        {text}
                    </LenkeBase>
                </div>
            </div>
        </>
    );
};

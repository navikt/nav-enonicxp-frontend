import React from 'react';
import { LinkCard } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { PictogramsProps } from 'types/content-props/pictograms';
import { CardSize, CardType } from 'types/card';
import { Illustration } from 'components/_common/illustration/Illustration';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { LinkProps } from 'types/link-props';
import { useCard } from 'components/_common/card/useCard';

import style from './MiniCardV1.module.scss';

export type MiniKortProps = {
    illustration?: PictogramsProps;
    link: LinkProps;
    type: CardType;
    className?: string;
    tryFallbackIllustration?: boolean;
};

export const MiniCardV1 = (props: MiniKortProps) => {
    const { link, illustration, type, className, tryFallbackIllustration } = props;
    const { text } = link;
    const { userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Mini,
        link,
    });

    return (
        <div className={className}>
            <LinkCard className={classNames(style.miniCardV1, type)} {...userEventProps}>
                {illustration && (
                    <LinkCard.Icon>
                        <Illustration
                            className={style.illustration}
                            illustration={illustration}
                            tryFallbackIllustration={tryFallbackIllustration}
                        />
                    </LinkCard.Icon>
                )}
                <LinkCard.Title>
                    <LinkCard.Anchor asChild>
                        <LenkeBase href={link.url} {...analyticsProps}>
                            {text}
                        </LenkeBase>
                    </LinkCard.Anchor>
                </LinkCard.Title>
            </LinkCard>
        </div>
    );
};

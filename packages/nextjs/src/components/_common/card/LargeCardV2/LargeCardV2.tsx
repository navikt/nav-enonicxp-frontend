import React from 'react';
import { LinkCard } from '@navikt/ds-react';
import { PictogramsProps } from 'types/content-props/pictograms';
import { CardSize, CardType } from 'types/card';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { IllustrationStatic } from 'components/_common/illustration/static/IllustrationStatic';
import { LinkProps } from 'types/link-props';
import { useCard } from 'components/_common/card/useCard';

import style from './LargeCardV2.module.scss';

const cardTypesWithIllustration: ReadonlySet<CardType> = new Set<CardType>([
    CardType.Product,
    CardType.Situation,
    CardType.ThemedArticle,
    CardType.Guide,
]);

type Props = {
    tagline?: string;
    description?: string;
    illustration?: PictogramsProps;
    link: LinkProps;
    type: CardType;
};

export const LargeCardV2 = (props: Props) => {
    const { link, description, type, tagline, illustration } = props;

    const hasIllustration = illustration && cardTypesWithIllustration.has(type);

    const { userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Large,
        link,
    });

    return (
        <LinkCard className={style.largeCardV2} {...userEventProps}>
            {hasIllustration && (
                <LinkCard.Icon>
                    <IllustrationStatic
                        illustration={illustration}
                        className={style.illustration}
                    />
                </LinkCard.Icon>
            )}
            <LinkCard.Title>
                <LinkCard.Anchor asChild>
                    <LenkeBase href={link.url} {...analyticsProps}>
                        {link.text}
                    </LenkeBase>
                </LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>{description}</LinkCard.Description>
            <LinkCard.Footer className={style.tagline}>{tagline}</LinkCard.Footer>
        </LinkCard>
    );
};

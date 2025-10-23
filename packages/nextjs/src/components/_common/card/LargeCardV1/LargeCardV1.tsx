import React from 'react';
import { LinkCard, VStack } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { PictogramsProps } from 'types/content-props/pictograms';
import { CardSize, CardType } from 'types/card';
import { Illustration } from 'components/_common/illustration/Illustration';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { LinkProps } from 'types/link-props';
import { useCard } from 'components/_common/card/useCard';

import sharedStyle from 'components/_common/card//Card.module.scss';
import style from './LargeCardV1.module.scss';

type Props = {
    tagline?: string;
    description?: string;
    illustration?: PictogramsProps;
    link: LinkProps;
    type: CardType;
};

export const LargeCardV1 = (props: Props) => {
    const { link, description, type, tagline, illustration } = props;
    const { text } = link;

    const hasIllustration = illustration;

    const { userEventProps, analyticsProps } = useCard({
        type,
        size: CardSize.Large,
        link,
    });

    return (
        <LinkCard {...userEventProps}>
            {hasIllustration && (
                <VStack justify="center" height="100%" asChild>
                    <LinkCard.Icon>
                        <Illustration illustration={illustration} className={style.illustration} />
                    </LinkCard.Icon>
                </VStack>
            )}
            <LinkCard.Title>
                <LinkCard.Anchor asChild>
                    <LenkeBase
                        href={link.url}
                        {...analyticsProps}
                        className={classNames(style.title, sharedStyle.lenkeBaseOverride)}
                    >
                        {text}
                    </LenkeBase>
                </LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>{description}</LinkCard.Description>
            <LinkCard.Footer className={style.tagline}>{tagline}</LinkCard.Footer>
        </LinkCard>
    );
};

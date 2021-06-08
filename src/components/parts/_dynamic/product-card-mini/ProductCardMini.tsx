import React from 'react';
import { ProductCardProps } from '../../../../types/component-props/parts/product-card';
import { LinkProps } from 'types/link-props';
import { CardType } from 'types/card';
import { MiniCard } from 'components/_common/card/MiniCard';

export const ProductCardMiniPart = ({ config, ...rest }: ProductCardProps) => {
    if (!config?.targetPage) {
        return (
            <div>
                Velg en produktside eller livssituasjon for å aktivere kortet
            </div>
        );
    }

    console.log(config);

    const { targetPage } = config;

    const { _path, data } = targetPage;
    const { title, illustration } = data;

    const cardType = CardType.Situation; // Must derive from link!

    const link: LinkProps = {
        url: _path,
        text: title,
        label: title,
    };

    return <MiniCard link={link} illustration={illustration} type={cardType} />;
};

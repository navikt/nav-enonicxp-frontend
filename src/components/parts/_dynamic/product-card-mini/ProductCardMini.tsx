import React from 'react';
import { ProductCardProps } from '../../../../types/component-props/parts/product-card';
import { LinkProps } from 'types/link-props';
import { CardType } from 'types/card';
import { MiniCard } from 'components/_common/card/MiniCard';
import { ContentType } from 'types/content-props/_content-common';

export const ProductCardMiniPart = ({ config, ...rest }: ProductCardProps) => {
    if (!config?.targetPage) {
        return (
            <div>
                Velg en produktside eller livssituasjon for å aktivere kortet
            </div>
        );
    }

    if (!config.targetPage.data) {
        return <div>void</div>;
    }

    const determineCardType = () => {
        const pageTypeName = config.targetPage.__typename;

        if (!pageTypeName) {
            return CardType.Tool;
        }

        return pageTypeName === ContentType.ContentPageWithSidemenus
            ? CardType.Product
            : CardType.Situation;
    };

    const { targetPage } = config;

    const { _path, data } = targetPage;
    const { title, illustration } = data;

    const cardType = CardType.Situation; // Must derive from link!

    const link: LinkProps = {
        url: _path,
        text: title,
        label: title,
    };

    return (
        <MiniCard
            link={link}
            illustration={illustration}
            type={determineCardType()}
        />
    );
};

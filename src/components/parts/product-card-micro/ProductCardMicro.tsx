import React from 'react';

import { LinkProps } from 'types/link-props';
import { CardType } from 'types/card';

import { ContentType } from 'types/content-props/_content-common';
import { MicroCard } from 'components/_common/card/MicroCard';
import {
    ProductCardMicroProps,
    TargetPage,
} from '../../../types/component-props/parts/product-card';

export const ProductCardMicroPart = ({ config }: ProductCardMicroProps) => {
    if (config?.card_list?.length === 0) {
        return (
            <div>
                Velg minst én produktside eller livssituasjon for å aktivere
                mikrokortet!
            </div>
        );
    }

    const { card_list } = config;

    const determineCardType = (_targetPage: TargetPage): CardType => {
        const pageTypeName = _targetPage.__typename;

        if (pageTypeName === ContentType.ToolsPage) {
            return CardType.Tool;
        }

        return pageTypeName === ContentType.ProductPage
            ? CardType.Product
            : CardType.Situation;
    };

    return (
        <>
            {card_list.map((card) => {
                const { _path, data } = card.targetPage;
                const link: LinkProps = {
                    url: _path,
                    text: data.title,
                    label: data.taxonomy,
                };
                return (
                    <MicroCard
                        key={card.targetPage._id}
                        link={link}
                        type={determineCardType(card.targetPage)}
                    />
                );
            })}
        </>
    );
};

import React from 'react';
import { MicroCards } from 'components/_common/card/MicroCard';
import { ProductCardMicroProps } from 'types/component-props/parts/product-card';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

export const ProductCardMicroPart = ({ config }: ProductCardMicroProps) => {
    if (!config?.card_list || config.card_list.length === 0) {
        return (
            <EditorHelp
                text={'Velg minst én lenke for å aktivere mikrokortene'}
            />
        );
    }

    const { card_list, header } = config;

    return (
        <MicroCards
            card_list={card_list.map((card) => card.targetPage)}
            header={header}
        />
    );
};

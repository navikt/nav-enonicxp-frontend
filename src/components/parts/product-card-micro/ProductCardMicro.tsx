import React from 'react';
import { MicroCards } from 'components/_common/card/MicroCard';
import { TargetPage } from '../../../types/component-props/part-configs/product-card';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { PartComponent, PartType } from '../../../types/component-props/parts';

export const ProductCardMicroPart: PartComponent<PartType.ProductCardMicro> = ({
    config,
}) => {
    if (!config?.card_list || config.card_list.length === 0) {
        return (
            <EditorHelp
                text={'Velg minst én lenke for å aktivere mikrokortene'}
            />
        );
    }

    const { card_list, header } = config;

    const targetPages = card_list.reduce<TargetPage[]>((acc, card) => {
        if (card.targetPage) {
            acc.push(card.targetPage);
        }

        return acc;
    }, []);

    return <MicroCards card_list={targetPages} header={header} />;
};

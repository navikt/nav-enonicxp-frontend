import React from 'react';
import { MicroCards } from 'components/_common/card/MicroCard/MicroCards';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { CardTargetProps } from 'components/_common/card/card-utils';

export type PartConfigProductCardMicro = {
    header?: string;
    card_list: Array<{ targetPage?: CardTargetProps }>;
};

export const ProductCardMicroPart = ({ config }: PartComponentProps<PartType.ProductCardMicro>) => {
    if (!config?.card_list || config.card_list.length === 0) {
        return <EditorHelp text={'Velg minst én lenke for å aktivere mikrokortene'} />;
    }

    const { card_list, header } = config;

    const targetPages = card_list.reduce<CardTargetProps[]>((acc, card) => {
        if (card.targetPage) {
            acc.push(card.targetPage);
        }

        return acc;
    }, []);

    return <MicroCards card_list={targetPages} header={header} />;
};

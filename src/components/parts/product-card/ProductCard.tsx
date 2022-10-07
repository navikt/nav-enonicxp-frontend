import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { PartType } from 'types/component-props/parts';
import {
    ProductCardMiniProps,
    ProductCardProps,
} from 'types/component-props/parts/product-card';
import { getCardProps } from '../../_common/card/card-utils';
import { MiniCard } from '../../_common/card/MiniCard';
import { LargeCard } from '../../_common/card/LargeCard';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

export const ProductCardPart = ({
    config,
    descriptor,
}: ProductCardProps | ProductCardMiniProps) => {
    const { language } = usePageConfig();

    if (!config?.targetPage) {
        return (
            <EditorHelp
                text={
                    'Velg en produktside eller livssituasjon for å aktivere kortet'
                }
            />
        );
    }

    const { targetPage, header, ingressOverride } = config;

    const props = getCardProps(targetPage, language, ingressOverride);

    if (!props) {
        return <EditorHelp type={'error'} text={'Kortet mangler innhold'} />;
    }

    if (descriptor === PartType.ProductCard) {
        return <LargeCard {...props} />;
    }

    if (descriptor === PartType.ProductCardMini) {
        return <MiniCard {...props} header={header} />;
    }

    return <EditorHelp type={'error'} text={'Kortet har ugyldig type'} />;
};

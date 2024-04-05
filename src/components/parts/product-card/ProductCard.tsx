import React from 'react';
import { usePageContentProps } from 'store/pageContext';
import { PartType } from 'types/component-props/parts';
import { ProductCardMiniProps, ProductCardProps } from 'types/component-props/parts/product-card';
import { getCardProps } from 'components/_common/card/card-utils';
import { MiniCard } from 'components/_common/card/MiniCard';
import { LargeCard } from 'components/_common/card/LargeCard';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const ProductCardPart = ({
    config,
    descriptor,
}: ProductCardProps | ProductCardMiniProps) => {
    const pageContext = usePageContentProps();

    if (!config?.targetPage) {
        return (
            <EditorHelp text={'Velg en produktside eller livssituasjon for å aktivere kortet'} />
        );
    }

    const { targetPage, header, ingressOverride } = config;

    const props = getCardProps(targetPage, pageContext, ingressOverride);

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

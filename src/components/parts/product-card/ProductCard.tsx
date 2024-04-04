import React from 'react';
import { usePageContentProps } from 'store/pageContext';
import { getCardProps } from 'components/_common/card/card-utils';
import { MiniCard } from 'components/_common/card/MiniCard';
import { LargeCard } from 'components/_common/card/LargeCard';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PartComponent, PartType } from 'types/component-props/parts';
import {
    ProductPageProps,
    SituationPageProps,
    ToolsPageProps,
} from 'types/content-props/dynamic-page-props';

// TODO: split into separate files

export type TargetPage = ProductPageProps | SituationPageProps | ToolsPageProps;

type ProductTarget = {
    header?: string;
    targetPage: TargetPage;
    ingressOverride?: string;
};

export type PartConfigProductCard = ProductTarget;

export type PartConfigProductCardMini = ProductTarget;

export type PartConfigProductCardMicro = {
    header?: string;
    card_list: Array<{ targetPage?: TargetPage }>;
};

export const ProductCardPart: PartComponent<PartType.ProductCard> = ({ config }) => {
    const pageConfig = usePageContentProps();

    if (!config?.targetPage) {
        return (
            <EditorHelp text={'Velg en produktside eller livssituasjon for å aktivere kortet'} />
        );
    }

    const { targetPage, ingressOverride } = config;

    const props = getCardProps(targetPage, pageConfig, ingressOverride);

    if (!props) {
        return <EditorHelp type={'error'} text={'Kortet mangler innhold'} />;
    }

    return <LargeCard {...props} />;
};

export const ProductCardMiniPart: PartComponent<PartType.ProductCardMini> = ({ config }) => {
    const pageConfig = usePageContentProps();

    if (!config?.targetPage) {
        return (
            <EditorHelp text={'Velg en produktside eller livssituasjon for å aktivere kortet'} />
        );
    }

    const { targetPage, header, ingressOverride } = config;

    const props = getCardProps(targetPage, pageConfig, ingressOverride);

    if (!props) {
        return <EditorHelp type={'error'} text={'Kortet mangler innhold'} />;
    }

    return <MiniCard {...props} header={header} />;
};

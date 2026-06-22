import React from 'react';
import { usePageContentProps } from 'store/pageContext';
import { CardTargetProps, getCardProps } from 'components/_common/card/card-utils';
import { LargeCard } from 'components/_common/card/LargeCard/LargeCard';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { TjenesterOversiktPanel } from 'components/_common/tjenesterOversiktPanel/TjenesterOversiktPanel';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ContentType } from 'types/content-props/_content-common';

export type PartConfigProductCard = {
    targetPage: CardTargetProps;
    ingressOverride?: string;
};

export const ProductCardPart = ({ config }: PartComponentProps<PartType.ProductCard>) => {
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

    if (pageConfig.type === ContentType.SituationPage) {
        return (
            <TjenesterOversiktPanel
                title={props.link.text}
                url={props.link.url}
                ingress={props.description}
                illustration={props.illustration}
                variant="situationPage"
            />
        );
    }

    return <LargeCard {...props} />;
};

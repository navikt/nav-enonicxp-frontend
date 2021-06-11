import React from 'react';

import { translator } from 'translations';

import { LinkProps } from 'types/link-props';
import { CardType } from 'types/card';

import { usePageConfig } from '../../../store/hooks/usePageConfig';

import { ContentType } from 'types/content-props/_content-common';
import { LargeCard } from 'components/_common/card/LargeCard';
import { MicroCard } from 'components/_common/card/MicroCard';
import { MiniCard } from 'components/_common/card/MiniCard';
import { PartType } from 'types/component-props/parts';
import { ProductCardProps } from '../../../types/component-props/parts/product-card';

export const ProductCardPart = ({ config, descriptor }: ProductCardProps) => {
    const { language } = usePageConfig();

    if (!config?.targetPage) {
        return (
            <div>
                Velg en produktside eller livssituasjon for å aktivere kortet
            </div>
        );
    }

    if (!config.targetPage.data) {
        return null;
    }

    const { ingressOverride, targetPage } = config;
    const { data } = targetPage;
    const { title, ingress, illustration, taxonomy } = data;

    const determineCardType = (): CardType => {
        const pageTypeName = config.targetPage.__typename;

        if (pageTypeName === ContentType.ToolsPage) {
            return CardType.Tool;
        }

        return pageTypeName === ContentType.ProductPage
            ? CardType.Product
            : CardType.Situation;
    };

    // If the linked page is the actual page to show, use _path,
    // however, the page (ie a tool page) can also act as an intermediate page
    const determineCardURL = (): string => {
        if (targetPage.__typename === ContentType.ToolsPage) {
            return targetPage.data?.url || targetPage._path;
        }
        return targetPage._path;
    };

    const link: LinkProps = {
        url: determineCardURL(),
        text: title,
        label: taxonomy,
    };

    const getCategoryLabel = translator('taxonomies', language);
    const category = getCategoryLabel(taxonomy);
    const ingressActual = ingressOverride || ingress;

    if (descriptor === PartType.ProductCard) {
        return (
            <LargeCard
                link={link}
                description={ingressActual}
                illustration={illustration}
                type={determineCardType()}
                category={category}
            />
        );
    }

    if (descriptor === PartType.ProductCardMini) {
        return (
            <MiniCard
                link={link}
                illustration={illustration}
                type={determineCardType()}
            />
        );
    }

    if (descriptor === PartType.ProductCardMicro) {
        console.log(config.targetPage);
        return <MicroCard link={link} type={determineCardType()} />;
    }

    // Error handling if descriptor was not set for some reason.
    return null;
};

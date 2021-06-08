import React from 'react';
import { ProductCardProps } from '../../../../types/component-props/parts/product-card';
import { LinkProps } from 'types/link-props';
import { CardType } from 'types/card';
import { translator } from 'translations';
import { usePageConfig } from '../../../../store/hooks/usePageConfig';
import { LargeCard } from 'components/_common/card/LargeCard';

export const ProductCardPart = ({ config }: ProductCardProps) => {
    const { language } = usePageConfig();

    if (!config?.targetPage) {
        return (
            <div>
                {
                    'Velg en produktside eller livssituasjon for å aktivere kortet'
                }
            </div>
        );
    }

    const { ingressOverride, targetPage } = config;
    const getCategoryLabel = translator('taxonomies', language);

    const { _path, data } = targetPage;
    const { title, ingress, illustration, taxonomy } = data;

    const ingressActual = ingressOverride || ingress;

    const cardType = CardType.Situation; // Must derive from link!

    const link: LinkProps = {
        url: _path,
        text: title,
        label: taxonomy,
    };

    const category = getCategoryLabel(taxonomy);

    return (
        <LargeCard
            link={link}
            description={ingressActual}
            illustration={illustration}
            type={cardType}
            category={category}
        />
    );
};

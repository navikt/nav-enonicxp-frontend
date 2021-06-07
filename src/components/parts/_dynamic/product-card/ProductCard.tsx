import React from 'react';
import { ProductCardProps } from '../../../../types/component-props/parts/product-card';
import { Card } from 'components/_common/card/Card';
import { LinkProps } from 'types/link-props';
import { CardSize, CardType } from 'types/card';
import { translator } from 'translations';
import { usePageConfig } from '../../../../store/hooks/usePageConfig';

export const ProductCardPart = ({ config, ...rest }: ProductCardProps) => {
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

    const cardType = CardType.Situation;

    const link: LinkProps = {
        url: _path,
        text: title,
        label: taxonomy,
    };

    const category = getCategoryLabel(taxonomy);

    return (
        <Card
            link={link}
            description={ingressActual}
            size={CardSize.Large}
            illustration={illustration}
            type={cardType}
            category={category}
        />
    );
};

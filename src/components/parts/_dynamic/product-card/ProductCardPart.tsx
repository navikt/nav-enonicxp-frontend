import React from 'react';
import { ProductCardProps } from '../../../../types/component-props/parts/product-card';
import { Card } from 'components/_common/card/Card';
import { LinkProps } from 'types/link-props';
import { CardSize, CardType } from 'types/card';
import { translator } from 'translations';
import { usePageConfig } from '../../../../store/hooks/usePageConfig';

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
    const { title, ingress, label, illustration, taxonomy } = data;

    const ingressActual = ingressOverride || ingress;

    const cardType = CardType.Product;

    const link: LinkProps = {
        url: _path,
        text: title,
        label: label,
    };

    const category = getCategoryLabel(taxonomy);

    console.log(config);

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

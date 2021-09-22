import React from 'react';
import { Label } from '@navikt/ds-react';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { PartType } from 'types/component-props/parts';
import {
    ProductCardMiniProps,
    ProductCardProps,
} from '../../../types/component-props/parts/product-card';
import { getCardProps } from '../../_common/card/card-utils';
import { MiniCard } from '../../_common/card/MiniCard';
import { LargeCard } from '../../_common/card/LargeCard';

export const ProductCardPart = ({
    config,
    descriptor,
}: ProductCardProps | ProductCardMiniProps) => {
    const { language } = usePageConfig();

    if (!config?.targetPage) {
        return (
            <div>
                Velg en produktside eller livssituasjon for å aktivere kortet
            </div>
        );
    }

    const { targetPage, title } = config;

    const props = getCardProps(targetPage, language);

    if (!props) {
        return null;
    }

    if (descriptor === PartType.ProductCard) {
        return <LargeCard {...props} />;
    }

    if (descriptor === PartType.ProductCardMini) {
        return (
            <div>
                {title && <Label size="m">{title}</Label>}
                <MiniCard {...props} />
            </div>
        );
    }

    return null;
};

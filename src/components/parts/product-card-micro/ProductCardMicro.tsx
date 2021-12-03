import React from 'react';
import { Label } from '@navikt/ds-react';
import { MicroCard } from 'components/_common/card/MicroCard';
import { ProductCardMicroProps } from '../../../types/component-props/parts/product-card';
import { getCardProps } from '../../_common/card/card-utils';
import { usePageConfig } from '../../../store/hooks/usePageConfig';

export const ProductCardMicroPart = ({ config }: ProductCardMicroProps) => {
    const { language } = usePageConfig();

    if (config?.card_list?.length === 0 || !config?.card_list) {
        return (
            <div>
                Velg minst én produktside eller livssituasjon for å aktivere
                mikrokortet!
            </div>
        );
    }

    const { card_list, header } = config;

    return (
        <>
            {header && <Label size="medium">{header}</Label>}
            {card_list.map((card) => {
                const props = getCardProps(card.targetPage, language);
                return (
                    props && <MicroCard {...props} key={card.targetPage._id} />
                );
            })}
        </>
    );
};

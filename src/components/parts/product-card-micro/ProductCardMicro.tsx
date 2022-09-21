import React from 'react';
import { Label } from '@navikt/ds-react';
import { MicroCard } from 'components/_common/card/MicroCard';
import { ProductCardMicroProps } from '../../../types/component-props/parts/product-card';
import { getCardProps } from '../../_common/card/card-utils';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';

export const ProductCardMicroPart = ({ config }: ProductCardMicroProps) => {
    const { language } = usePageConfig();

    if (!config?.card_list || config.card_list.length === 0) {
        return (
            <EditorHelp
                text={'Velg minst én lenke for å aktivere mikrokortene'}
            />
        );
    }

    const { card_list, header } = config;

    const cardProps = card_list.reduce((acc, card) => {
        const props = getCardProps(card.targetPage, language);
        return props ? [...acc, props] : acc;
    }, []);

    if (cardProps.length === 0) {
        return (
            <EditorHelp
                text={'Velg minst én lenke for å aktivere mikrokortene'}
            />
        );
    }

    return (
        <>
            {header && (
                <Label size="medium" style={{ display: 'block' }}>
                    {header}
                </Label>
            )}
            {cardProps.map((card, index) => (
                <MicroCard {...card} key={index} />
            ))}
        </>
    );
};

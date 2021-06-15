import React from 'react';
import { MacroProductCardMiniProps } from '../../../types/macro-props/product-card-mini';
import { MiniCard } from '../../_common/card/MiniCard';
import { getCardProps } from '../../_common/card/card-utils';
import { usePageConfig } from '../../../store/hooks/usePageConfig';

export const MacroProductCardMini = ({ config }: MacroProductCardMiniProps) => {
    const { language } = usePageConfig();

    if (!config?.product_card_mini) {
        return null;
    }

    const { targetPage } = config.product_card_mini;

    const props = getCardProps(targetPage, language);

    return <MiniCard {...props} />;
};

import React from 'react';
import { MacroProductCardMiniProps } from 'types/macro-props/product-card-mini';
import { MiniCard } from '../../_common/card/MiniCard';
import { getCardProps } from '../../_common/card/card-utils';
import { usePageContextProps } from 'store/pageContext';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const MacroProductCardMini = ({ config }: MacroProductCardMiniProps) => {
    const pageContext = usePageContextProps();

    if (!config?.product_card_mini) {
        return <EditorHelp text={'Macroen mangler konfigurasjon'} />;
    }

    const { targetPage } = config.product_card_mini;

    const props = getCardProps(targetPage, pageContext);

    return props && <MiniCard {...props} />;
};

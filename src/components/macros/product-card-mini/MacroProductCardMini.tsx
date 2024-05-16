import React from 'react';
import { MacroProductCardMiniProps } from 'types/macro-props/product-card-mini';
import { MiniCardV2 } from 'components/_common/cardV2/MiniCardV2';
import { getCardProps } from 'components/_common/card/card-utils';
import { usePageContentProps } from 'store/pageContext';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const MacroProductCardMini = ({ config }: MacroProductCardMiniProps) => {
    const pageContext = usePageContentProps();

    if (!config?.product_card_mini) {
        return <EditorHelp text={'Macroen mangler konfigurasjon'} />;
    }

    const { targetPage } = config.product_card_mini;

    const props = getCardProps(targetPage, pageContext);

    return props && <MiniCardV2 {...props}/>;
};

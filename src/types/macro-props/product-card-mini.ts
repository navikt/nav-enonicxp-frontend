import { MacroPropsCommon, MacroType } from './_macros-common';

import { PartConfigProductCardMini } from 'components/parts/product-card/ProductCard';

export interface MacroProductCardMiniProps extends MacroPropsCommon {
    name: MacroType.ProductCardMini;
    config: {
        product_card_mini: PartConfigProductCardMini;
    };
}

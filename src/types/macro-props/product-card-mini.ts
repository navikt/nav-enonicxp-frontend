import { MacroPropsCommon, MacroType } from './_macros-common';
import { PartConfigProductCardMini } from 'types/component-props/part-configs/product-card';

export interface MacroProductCardMiniProps extends MacroPropsCommon {
    name: MacroType.ProductCardMini;
    config: {
        product_card_mini: PartConfigProductCardMini;
    };
}

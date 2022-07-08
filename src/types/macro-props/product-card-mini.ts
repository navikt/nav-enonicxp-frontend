import { MacroPropsCommon, MacroType } from './_macros-common';
import { ProductTarget } from '../component-props/parts/product-card';

export interface MacroProductCardMiniProps extends MacroPropsCommon {
    name: MacroType.ProductCardMini;
    config: {
        product_card_mini: ProductTarget;
    };
}

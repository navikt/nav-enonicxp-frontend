import { ProductCardMiniProps } from 'types/component-props/parts/product-card';
import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroProductCardMiniProps extends MacroPropsCommon {
    name: MacroType.ProductCardMini;
    config: {
        product_card_mini: ProductCardMiniProps['config'];
    };
}

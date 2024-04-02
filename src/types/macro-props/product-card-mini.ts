import { MacroPropsCommon, MacroType } from './_macros-common';
import { ProductCardMiniProps } from 'types/component-props/parts/product-card';

export interface MacroProductCardMiniProps extends MacroPropsCommon {
    name: MacroType.ProductCardMini;
    config: {
        product_card_mini: ProductCardMiniProps['config'];
    };
}

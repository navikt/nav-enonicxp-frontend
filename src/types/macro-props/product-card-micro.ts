import { MacroPropsCommon, MacroType } from './_macros-common';

import { TargetPage } from 'components/parts/product-card/ProductCard';

export interface MacroProductCardMicroProps extends MacroPropsCommon {
    name: MacroType.ProductCardMicro;
    config: {
        product_card_micro: {
            header?: string;
            card_list: TargetPage[];
        };
    };
}

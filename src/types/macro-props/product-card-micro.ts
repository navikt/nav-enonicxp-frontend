import { MacroPropsCommon, MacroType } from './_macros-common';
import { TargetPage } from '../component-props/parts/product-card';

export interface MacroProductCardMicroProps extends MacroPropsCommon {
    name: MacroType.ProductCardMicro;
    config: {
        product_card_micro: {
            header?: string;
            card_list: TargetPage[];
        };
    };
}

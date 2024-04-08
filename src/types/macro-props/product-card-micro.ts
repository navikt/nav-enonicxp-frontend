import { TargetPage } from 'types/component-props/parts/product-card';
import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroProductCardMicroProps extends MacroPropsCommon {
    name: MacroType.ProductCardMicro;
    config: {
        product_card_micro: {
            header?: string;
            card_list: TargetPage[];
        };
    };
}

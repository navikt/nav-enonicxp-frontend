import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroLinkToLayerProps extends MacroPropsCommon {
    name: MacroType.LinkToLayer;
    config: {
        link_to_layer: {
            body: string;
            href: string;
            newTab: boolean;
            tooltip?: string;
        };
    };
}

import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroHeaderWithAnchorProps extends MacroPropsCommon {
    name: MacroType.HeaderWithAnchor;
    config: {
        header_with_anchor: {
            text: string;
            id: string;
            tag: 'h3' | 'h4';
        };
    };
}

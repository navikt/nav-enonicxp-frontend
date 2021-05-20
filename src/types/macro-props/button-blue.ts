import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroButtonBlueProps extends MacroPropsCommon {
    name: MacroType.ButtonBlue;
    config: {
        button_blue: {
            url: string;
            text: string;
            content: {
                _path: string;
            };
        };
    };
}

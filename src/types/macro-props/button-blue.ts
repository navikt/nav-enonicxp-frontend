import { MacroPropsCommon, MacroName } from './_macros-common';

export interface MacroButtonBlueProps extends MacroPropsCommon {
    name: MacroName.ButtonBlue;
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

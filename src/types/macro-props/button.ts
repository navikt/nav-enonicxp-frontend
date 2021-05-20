import { MacroPropsCommon, MacroName } from './_macros-common';

export interface MacroButtonProps extends MacroPropsCommon {
    name: MacroName.Button;
    config: {
        button: {
            url: string;
            text: string;
            content: {
                _path: string;
            };
        };
    };
}

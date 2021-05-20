import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroButtonProps extends MacroPropsCommon {
    name: MacroType.Button;
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

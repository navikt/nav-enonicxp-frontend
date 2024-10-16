import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroInfoBoksProps extends MacroPropsCommon {
    name: MacroType.InfoBoks;
    config: {
        infoBoks: {
            infoBoks: string;
        };
    };
}

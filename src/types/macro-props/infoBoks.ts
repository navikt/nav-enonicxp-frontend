import { MacroPropsCommon, MacroType } from './_macros-common';

export interface InfoBoksMacroProps extends MacroPropsCommon {
    name: MacroType.Infoboks;
    config: {
        infoBoks: {
            infoBoks: string;
        };
    };
}

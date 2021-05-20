import { MacroPropsCommon, MacroName } from './_macros-common';

export interface InfoBoksMacroProps extends MacroPropsCommon {
    name: MacroName.Infoboks;
    config: {
        infoBoks: {
            infoBoks: string;
        };
    };
}

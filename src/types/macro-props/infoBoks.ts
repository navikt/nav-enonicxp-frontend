import { MacroPropsCommon, MacroType } from './_macros-common';

interface InfoBoksMacroProps extends MacroPropsCommon {
    descriptor: MacroType.Infoboks;
    config: {
        infoBoks: string;
    };
}

import { MacroPropsCommon, MacroType } from './_macros-common';

interface FotnoteMacroProps extends MacroPropsCommon {
    descriptor: MacroType.Fotnote;
    config: {
        fotnote: string;
    };
}

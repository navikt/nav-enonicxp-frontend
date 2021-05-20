import { MacroPropsCommon, MacroType } from './_macros-common';

export interface FotnoteMacroProps extends MacroPropsCommon {
    name: MacroType.Fotnote;
    config: {
        fotnote: {
            fotnote: string;
        };
    };
}

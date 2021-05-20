import { MacroPropsCommon, MacroName } from './_macros-common';

export interface FotnoteMacroProps extends MacroPropsCommon {
    name: MacroName.Fotnote;
    config: {
        fotnote: {
            fotnote: string;
        };
    };
}

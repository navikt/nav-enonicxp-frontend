import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroFotnoteProps extends MacroPropsCommon {
    name: MacroType.Fotnote;
    config: {
        fotnote: {
            fotnote: string;
        };
    };
}

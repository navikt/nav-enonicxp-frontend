import { GlobalCaseTimeUnit } from 'types/content-props/global-values-props';
import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroSaksbehandlingstidProps extends MacroPropsCommon {
    name: MacroType.Saksbehandlingstid;
    config: {
        saksbehandlingstid: {
            caseTime: {
                value: number;
                unit: GlobalCaseTimeUnit;
            };
        };
    };
}

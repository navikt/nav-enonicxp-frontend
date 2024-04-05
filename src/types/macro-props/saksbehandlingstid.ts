import { MacroPropsCommon, MacroType } from './_macros-common';
import { GlobalCaseTimeUnit } from 'types/content-props/global-values-props';

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

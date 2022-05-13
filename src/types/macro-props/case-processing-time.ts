import { MacroPropsCommon, MacroType } from './_macros-common';
import { CaseProcessingTimeUnit } from '../content-props/global-values-props';

export interface MacroCaseProcessingTimeProps extends MacroPropsCommon {
    name: MacroType.Saksbehandlingstid;
    config: {
        saksbehandlingstid: {
            caseTime: {
                value: number;
                unit: CaseProcessingTimeUnit;
            };
        };
    };
}

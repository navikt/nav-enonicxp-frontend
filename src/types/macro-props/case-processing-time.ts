import { MacroPropsCommon, MacroType } from './_macros-common';

export type CaseProcessingTimeUnit = 'days' | 'weeks' | 'months';

export interface MacroCaseProcessingTimeProps extends MacroPropsCommon {
    name: MacroType.Saksbehandlingstid;
    config: {
        saksbehandlingstid: {
            caseTime: {
                data: {
                    number: number;
                    unit: CaseProcessingTimeUnit;
                };
            };
        };
    };
}

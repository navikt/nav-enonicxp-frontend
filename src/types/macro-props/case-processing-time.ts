import { MacroPropsCommon, MacroType } from './_macros-common';
import { EmptyObject, OptionSetSingle } from '../util-types';

export type CaseProcessingTimeUnit = 'days' | 'weeks' | 'months';

export interface MacroCaseProcessingTimeProps extends MacroPropsCommon {
    name: MacroType.Saksbehandlingstid;
    config: {
        saksbehandlingstid: {
            caseTime: {
                data: {
                    number: number;
                    unit: OptionSetSingle<{
                        days: EmptyObject;
                        weeks: EmptyObject;
                        months: EmptyObject;
                    }>;
                };
            };
        };
    };
}

import { SkjemadetaljerData } from 'types/content-props/skjemadetaljer';
import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroSkjemadetaljerProps extends MacroPropsCommon {
    name: MacroType.PayoutDates;
    config: {
        form_details: {
            targetFormDetails: {
                data: SkjemadetaljerData;
            };
            showTitle: boolean;
            showIngress: boolean;
            showApplications: boolean;
            showAddendums: boolean;
        };
    };
}

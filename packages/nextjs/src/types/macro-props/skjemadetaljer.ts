import { FormDetailsData } from 'types/content-props/skjemadetaljer';
import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroFormDetailsProps extends MacroPropsCommon {
    name: MacroType.PayoutDates;
    config: {
        form_details: {
            targetFormDetails: {
                data: FormDetailsData;
            };
            showTitle: boolean;
            showIngress: boolean;
            showApplications: boolean;
            showAddendums: boolean;
        };
    };
}

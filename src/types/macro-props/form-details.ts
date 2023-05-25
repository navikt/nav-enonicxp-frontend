import { MacroPropsCommon, MacroType } from './_macros-common';
import { FormDetailsData } from 'types/content-props/form-details';

export interface MacroFormDetailsProps extends MacroPropsCommon {
    name: MacroType.PayoutDates;
    config: {
        form_details: {
            targetFormDetails: {
                data: FormDetailsData;
            };
            showTitle: boolean;
            showDescription: boolean;
            showApplications: boolean;
            showAddendums: boolean;
        };
    };
}

import { MacroPropsCommon, MacroType } from './_macros-common';
import { PayoutDatesData } from '../content-props/payout-dates';

export interface MacroFormDetailsProps extends MacroPropsCommon {
    name: MacroType.PayoutDates;
    config: {
        form_details: {
            targetFormDetails: {
                data: any;
            };
            showTitle: boolean;
            showDescription: boolean;
            showAddendums: boolean;
            showApplications: boolean;
        };
    };
}

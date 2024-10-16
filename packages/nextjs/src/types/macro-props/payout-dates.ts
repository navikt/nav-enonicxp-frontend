import { PayoutDatesData } from 'types/content-props/payout-dates';
import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroPayoutDatesProps extends MacroPropsCommon {
    name: MacroType.PayoutDates;
    config: {
        payout_dates: {
            payoutDates: {
                data: PayoutDatesData;
            };
        };
    };
}

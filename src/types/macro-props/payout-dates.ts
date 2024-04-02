import { MacroPropsCommon, MacroType } from './_macros-common';
import { PayoutDatesData } from 'types/content-props/payout-dates';

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

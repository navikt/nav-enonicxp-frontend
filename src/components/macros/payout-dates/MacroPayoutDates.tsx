import React from 'react';
import { MacroPayoutDatesProps } from '../../../types/macro-props/payout-dates';
import { PayoutDates } from '../../_common/payout-dates/PayoutDates';

export const MacroPayoutDates = ({ config }: MacroPayoutDatesProps) => {
    const payoutDatesData = config?.payout_dates?.payoutDates?.data;

    if (!payoutDatesData) {
        return null;
    }

    return <PayoutDates payoutDatesData={payoutDatesData} />;
};

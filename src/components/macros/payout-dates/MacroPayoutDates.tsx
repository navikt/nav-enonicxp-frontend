import React from 'react';
import { MacroPayoutDatesProps } from '../../../types/macro-props/payout-dates';
import { PayoutDates } from '../../_common/payout-dates/PayoutDates';

export const MacroPayoutDates = ({ config }: MacroPayoutDatesProps) => {
    if (!config?.payout_dates?.dates?.data) {
        return null;
    }

    return <PayoutDates dates={config.payout_dates.dates.data} />;
};

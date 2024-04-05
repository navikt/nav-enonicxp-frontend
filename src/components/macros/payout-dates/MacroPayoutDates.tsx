import React from 'react';

import { MacroPayoutDatesProps } from 'types/macro-props/payout-dates';
import { PayoutDates } from 'components/_common/payout-dates/PayoutDates';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';

export const MacroPayoutDates = ({ config }: MacroPayoutDatesProps) => {
    const payoutDatesData = config?.payout_dates?.payoutDates?.data;

    if (!payoutDatesData) {
        return <EditorHelp text={'Macroen mangler data for utbetalingsdatoer'} />;
    }

    return <PayoutDates payoutDatesData={payoutDatesData} />;
};

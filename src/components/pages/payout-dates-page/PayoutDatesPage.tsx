import React from 'react';
import { PayoutDatesProps } from 'types/content-props/payout-dates';
import { PayoutDates } from '../../_common/payout-dates/PayoutDates';

import style from './PayoutDatesPage.module.scss';

export const PayoutDatesPage = (props: PayoutDatesProps) => {
    return (
        <PayoutDates
            payoutDatesData={props.data}
            className={style.payoutDatesPage}
        />
    );
};

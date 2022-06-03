import React from 'react';
import { PayoutDatesProps } from '../../../types/content-props/payout-dates';
import { ErrorPage } from '../error-page/ErrorPage';
import { make404Props } from '../../../utils/make-error-props';
import { PayoutDates } from '../../_common/payout-dates/PayoutDates';

import style from './PayoutDatesPage.module.scss';

export const PayoutDatesPage = (props: PayoutDatesProps) => {
    if (!props.editorView) {
        return <ErrorPage {...make404Props(props._path)} />;
    }

    return (
        <PayoutDates
            payoutDatesData={props.data}
            className={style.payoutDatesPage}
        />
    );
};

import React from 'react';
import { PayoutDatesProps } from 'types/content-props/payout-dates';
import { PayoutDates } from 'components/_common/payoutDates/PayoutDates';
import Config from 'config';
import { LayersEditorWarning } from 'components/_editor-only/layers-editor-warning/LayersEditorWarning';

import style from './PayoutDatesPage.module.scss';

export const PayoutDatesPage = (props: PayoutDatesProps) => {
    const { layerLocale } = props;

    return (
        <article>
            {layerLocale !== Config.vars.defaultLocale && <LayersEditorWarning />}
            <PayoutDates payoutDatesData={props.data} className={style.payoutDatesPage} />
        </article>
    );
};

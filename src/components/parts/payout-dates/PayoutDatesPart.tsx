import React from 'react';

import { PayoutDatesPartProps } from 'types/component-props/parts/payout-dates';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PayoutDates } from 'components/_common/payout-dates/PayoutDates';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';

export const PayoutDatesPart = ({ config }: PayoutDatesPartProps) => {
    if (!config?.dates?.data) {
        return (
            <EditorHelp
                type={'help'}
                text={'Klikk her og velg et sett med utbetalingsdatoer i panelet til høyre'}
            />
        );
    }

    return (
        <ExpandableComponentWrapper {...config}>
            <PayoutDates payoutDatesData={config.dates.data} />
        </ExpandableComponentWrapper>
    );
};

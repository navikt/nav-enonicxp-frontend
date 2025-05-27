import React from 'react';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { PayoutDates } from 'components/_common/payoutDates/PayoutDates';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { PayoutDatesData } from 'types/content-props/payout-dates';
import { ExpandableMixin } from 'types/component-props/_mixins';

export type PartConfigPayoutDates = {
    dates: { data: PayoutDatesData };
} & ExpandableMixin;

export const PayoutDatesPart = ({ config }: PartComponentProps<PartType.PayoutDates>) => {
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

import React from 'react';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { PayoutDates } from 'components/_common/payout-dates/PayoutDates';
import { ExpandableComponentWrapper } from 'components/_common/expandable/ExpandableComponentWrapper';
import { PartComponent, PartType } from 'types/component-props/parts';

export const PayoutDatesPart: PartComponent<PartType.PayoutDates> = ({
    config,
}) => {
    if (!config?.dates?.data) {
        return (
            <EditorHelp
                type={'help'}
                text={
                    'Klikk her og velg et sett med utbetalingsdatoer i panelet til høyre'
                }
            />
        );
    }

    return (
        <ExpandableComponentWrapper {...config}>
            <PayoutDates payoutDatesData={config.dates.data} />
        </ExpandableComponentWrapper>
    );
};

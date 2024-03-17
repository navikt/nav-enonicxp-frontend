import React from 'react';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { PayoutDates } from '../../_common/payout-dates/PayoutDates';
import { ExpandableComponentWrapper } from '../../_common/expandable/ExpandableComponentWrapper';
import {
    PartComponentProps,
    PartType,
} from '../../../types/component-props/parts';

export const PayoutDatesPart = ({
    config,
}: PartComponentProps<PartType.PayoutDates>) => {
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

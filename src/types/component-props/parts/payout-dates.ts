import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { PayoutDatesData } from 'types/content-props/payout-dates';
import { ExpandableMixin, RenderOnAuthStateMixin } from 'types/component-props/_mixins';

export interface PayoutDatesPartProps extends PartComponentProps {
    descriptor: PartType.PayoutDates;
    config: {
        dates: { data: PayoutDatesData };
    } & ExpandableMixin &
        RenderOnAuthStateMixin;
}

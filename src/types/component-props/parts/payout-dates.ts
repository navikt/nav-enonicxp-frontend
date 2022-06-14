import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { PayoutDatesData } from '../../content-props/payout-dates';
import { ExpandableMixin, RenderOnAuthStateMixin } from '../_mixins';

export interface PayoutDatesPartProps extends PartComponentProps {
    descriptor: PartType.PayoutDates;
    config: {
        dates: { data: PayoutDatesData };
    } & ExpandableMixin &
        RenderOnAuthStateMixin;
}

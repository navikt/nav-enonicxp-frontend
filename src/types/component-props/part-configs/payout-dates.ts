import { PayoutDatesData } from 'types/content-props/payout-dates';
import { ExpandableMixin } from 'types/component-props/_mixins';

export type PartConfigPayoutDates = {
    dates: { data: PayoutDatesData };
} & ExpandableMixin;

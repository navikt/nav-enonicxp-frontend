import { PayoutDatesData } from '../../content-props/payout-dates';
import { ExpandableMixin } from '../_mixins';

export type PartConfigPayoutDates = {
    dates: { data: PayoutDatesData };
} & ExpandableMixin;

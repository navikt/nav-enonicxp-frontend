import { ContentProps, ContentType } from './_content-common';

type Month =
    | 'jan'
    | 'feb'
    | 'mar'
    | 'apr'
    | 'may'
    | 'jun'
    | 'jul'
    | 'aug'
    | 'sep'
    | 'oct'
    | 'nov'
    | 'dec';

export type PayoutDatesData = {
    dates: Record<Month, number>;
};

export interface PayoutDatesProps extends ContentProps {
    __typename: ContentType.PayoutDates;
    data: PayoutDatesData;
}

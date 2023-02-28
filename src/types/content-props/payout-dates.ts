import { ContentType, ContentCommonProps } from './_content-common';

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
    year: number;
    dates: Record<Month, number>;
};

export interface PayoutDatesProps extends ContentCommonProps {
    type: ContentType.PayoutDates;
    data: PayoutDatesData;
}

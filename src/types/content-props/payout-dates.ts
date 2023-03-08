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

export type PayoutDatesProps = ContentCommonProps & {
    type: ContentType.PayoutDates;
    data: PayoutDatesData;
};

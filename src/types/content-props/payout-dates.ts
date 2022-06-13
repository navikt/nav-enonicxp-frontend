import { ContentType, CustomContentCommonProps } from './_content-common';

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

export interface PayoutDatesProps extends CustomContentCommonProps {
    __typename: ContentType.PayoutDates;
    data: PayoutDatesData;
}

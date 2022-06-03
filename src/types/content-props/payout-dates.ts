import { ContentProps, ContentType } from './_content-common';
import { ProcessedHtmlProps } from '../processed-html-props';

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
    notes: ProcessedHtmlProps;
};

export interface PayoutDatesProps extends ContentProps {
    __typename: ContentType.PayoutDates;
    data: PayoutDatesData;
}

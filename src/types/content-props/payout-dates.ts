import { ContentProps, ContentType } from './_content-common';

export type PayoutDatesData = {
    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dec: number;
};

export interface PayoutDatesProps extends ContentProps {
    __typename: ContentType.PayoutDates;
    data: PayoutDatesData;
}

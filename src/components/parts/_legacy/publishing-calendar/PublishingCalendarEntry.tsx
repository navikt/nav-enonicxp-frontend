import * as React from 'react';
import { Table, BodyLong } from '@navikt/ds-react';
import { PublishingCalendarEntryProps } from 'types/content-props/publishing-calendar-props';

// eslint-disable-next-line css-modules/no-unused-class
import style from './PublishingCalendar.module.scss';

interface PublishingCalendarEntryData {
    displayName: string;
    period: string;
    publDate: Date;
    day: string;
    month: string;
}
const monthShortName = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAI',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OKT',
    'NOV',
    'DES',
];

export const sortEntries = (
    children: PublishingCalendarEntryProps[]
): PublishingCalendarEntryProps[] => {
    return children.sort((a, b) => {
        const aDate = new Date(a.data.date);
        const bDate = new Date(b.data.date);
        return aDate.getTime() - bDate.getTime();
    }); // Dato for publisering: stigende
};

const processEntry = (
    item: PublishingCalendarEntryProps
): PublishingCalendarEntryData => {
    const publDate = new Date(item.data.date);
    return {
        displayName: item.displayName,
        period: item.data.period,
        publDate,
        day: publDate.getDate().toString() + '.',
        month: monthShortName[publDate.getMonth()],
    };
};

const PublishingCalendarEntry = (props: PublishingCalendarEntryProps) => {
    const entry = processEntry(props);
    return (
        <Table.Row>
            <Table.DataCell>
                <time>
                    <span>{entry.day}</span>
                    <span>{entry.month}</span>
                </time>
            </Table.DataCell>
            <Table.DataCell>
                <BodyLong className={style.dateInfo}>{entry.period}</BodyLong>
                <BodyLong>{entry.displayName}</BodyLong>
            </Table.DataCell>
        </Table.Row>
    );
};

export default PublishingCalendarEntry;

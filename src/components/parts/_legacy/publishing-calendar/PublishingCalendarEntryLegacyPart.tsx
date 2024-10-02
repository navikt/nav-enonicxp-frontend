import * as React from 'react';
import { Table, BodyLong } from '@navikt/ds-react';
import { PublishingCalendarEntryProps } from 'types/content-props/publishing-calendar-props';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { LenkeInline } from 'components/_common/lenke/LenkeInline';

// eslint-disable-next-line css-modules/no-unused-class
import style from './PublishingCalendar.module.scss';

interface PublishingCalendarEntryData {
    displayName: string;
    period: string;
    publDate: Date;
    day: string;
    month: string;
    link?: string;
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

const processEntry = (item: PublishingCalendarEntryProps): PublishingCalendarEntryData => {
    const publDate = new Date(item.data.date);
    return {
        displayName: item.displayName,
        period: item.data.period,
        publDate,
        day: publDate.getDate().toString() + '.',
        month: monthShortName[publDate.getMonth()],
        link: item.data.link?._path,
    };
};

const EntryName = ({ displayName, link }: PublishingCalendarEntryData) => {
    return link ? (
        <LenkeInline href={link}>{displayName}</LenkeInline>
    ) : (
        <BodyLong>{displayName}</BodyLong>
    );
};

export const PublishingCalendarEntryLegacyPart = (props: ContentProps) => {
    if (props.type !== ContentType.PublishingCalendarEntry) {
        return null;
    }

    const entry = processEntry(props);

    return (
        <Table.Row>
            <Table.DataCell>
                <div className={style.dateCell}>
                    <span>{entry.day}</span>
                    <span>{entry.month}</span>
                </div>
            </Table.DataCell>
            <Table.DataCell>
                <BodyLong className={style.dateInfo}>{entry.period}</BodyLong>
                <EntryName {...entry} />
            </Table.DataCell>
        </Table.Row>
    );
};

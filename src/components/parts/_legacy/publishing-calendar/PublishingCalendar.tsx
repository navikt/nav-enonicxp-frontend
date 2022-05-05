import * as React from 'react';
import { Heading, BodyLong, Ingress } from '@navikt/ds-react';
import { translator } from '../../../../translations';
import {
    PublishingCalendarChildren,
    PublishingCalendarEntries,
    PublishingCalendarProps,
} from '../../../../types/content-props/publishing-calendar-props';
import { Table } from '../../../_common/table/Table';

import style from './PublishingCalendar.module.scss';

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

const processEntries = (
    children: PublishingCalendarChildren[]
): PublishingCalendarEntries[] => {
    return children
        .map((item) => {
            const publDate = new Date(item.data.date);
            return {
                displayName: item.displayName,
                period: item.data.period,
                publDate,
                day: publDate.getDate().toString() + '.',
                month: monthShortName[publDate.getMonth()],
            };
        })
        .sort((a, b) => a.publDate.getTime() - b.publDate.getTime()); // Dato for publisering: stigende
};

const PublishingCalendar = (props: PublishingCalendarProps) => {
    const getLabel = translator('publishingCalendar', props.language);
    const items = processEntries(props.children);

    return (
        <div className={style.publishingCalendar}>
            <header>
                <Heading level="1" size="large">
                    {props.displayName}
                </Heading>
                {props.data.ingress && (
                    <Ingress className={style.ingress}>
                        {props.data.ingress}
                    </Ingress>
                )}
            </header>
            <Table>
                <thead>
                    <tr>
                        <th scope="col">
                            <span className="visuallyhidden">
                                {getLabel('publishdate')}
                            </span>
                        </th>
                        <th scope="col">
                            <span className="visuallyhidden">
                                {getLabel('event')}
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        return (
                            <tr key={`${item.displayName}_${index}`}>
                                <td>
                                    <time>
                                        <div>{item.day}</div>
                                        <div>{item.month}</div>
                                    </time>
                                </td>
                                <td className={style.eventInfo}>
                                    <BodyLong className={style.dateInfo}>
                                        {item.period}
                                    </BodyLong>
                                    <BodyLong>{item.displayName}</BodyLong>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};
export default PublishingCalendar;

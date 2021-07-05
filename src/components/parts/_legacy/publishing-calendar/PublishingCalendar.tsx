import * as React from 'react';

import { Title, BodyShort, Ingress, Label } from '@navikt/ds-react';
import { BEM } from '../../../../utils/classnames';
import { translator } from '../../../../translations';
import './PublishingCalendar.less';
import {
    PublishingCalendarChildren,
    PublishingCalendarEntries,
    PublishingCalendarProps,
} from '../../../../types/content-props/publishing-calendar-props';

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
    const bem = BEM('publishing-calendar');
    const getLabel = translator('publishingCalendar', props.language);
    const items = processEntries(props.children);

    return (
        <div className={bem()}>
            <header>
                <Title level={1} size="l">
                    {props.displayName}
                </Title>
                {props.data.ingress && (
                    <Ingress className={bem('preface')}>
                        {props.data.ingress}
                    </Ingress>
                )}
            </header>
            <table className="tabell">
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
                                <td className="eventInfo">
                                    <BodyShort className="dateInfo">
                                        {item.period}
                                    </BodyShort>
                                    <Label>{item.displayName}</Label>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
export default PublishingCalendar;

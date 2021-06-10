import * as React from 'react';
import {
    Innholdstittel,
    Normaltekst,
    Undertittel,
    Element,
} from 'nav-frontend-typografi';
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
                <Innholdstittel>{props.displayName}</Innholdstittel>
                {props.data.ingress && (
                    <Normaltekst className={bem('preface')}>
                        {props.data.ingress}
                    </Normaltekst>
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
                                        <Element>{item.day}</Element>
                                        <Element>{item.month}</Element>
                                    </time>
                                </td>
                                <td className="eventInfo">
                                    <Normaltekst>{item.period}</Normaltekst>
                                    <Undertittel>
                                        {item.displayName}
                                    </Undertittel>
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

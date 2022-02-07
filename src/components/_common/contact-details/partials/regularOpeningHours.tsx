import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import { Heading } from '@navikt/ds-react';

import { BEM } from 'utils/classnames';

const bem = BEM('telephoneDetails');

export const RegularOpeningHours = ({ regularOpeningHours }) => {
    const { language } = usePageConfig();

    const getContactTranslations = translator('contactPoint', language);
    const getDateTimeTranslations = translator('dateTime', language);
    const sharedTranslations = getContactTranslations('shared');
    const weekDayNames = getDateTimeTranslations('weekDayNames');

    const getWeekDayName = (day: number) => {
        return weekDayNames[day];
    };

    return (
        <>
            <Heading level="2" size="medium" spacing>
                {sharedTranslations['openingHours']}
            </Heading>
            <table className={bem('regular-opening-hours')}>
                <thead>
                    <tr>
                        <th>{getDateTimeTranslations('day')}</th>
                        <th>{sharedTranslations['openingHours']}</th>
                    </tr>
                </thead>
                <tbody>
                    {regularOpeningHours.map((hour, index) => (
                        <tr key={index}>
                            <td>{getWeekDayName(index)}</td>
                            <td>
                                {hour.status === 'OPEN'
                                    ? `${hour.from} - ${hour.to}`
                                    : sharedTranslations['closed']}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

import React from 'react';

import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import { Title, BodyLong } from '@navikt/ds-react';
import { formatDate } from 'utils/datetime';

import { BEM } from 'utils/classnames';

import { shouldShowSpecialHours } from '../contactHelpers';

const bem = BEM('telephoneDetails');

export const SpecialOpeningHours = ({ specialOpeningHours }) => {
    const { language } = usePageConfig();

    // Misc translations
    const getDateTimeTranslations = translator('dateTime', language);
    const getContactTranslations = translator('contactPoint', language);
    const sharedTranslations = getContactTranslations('shared');

    if (!shouldShowSpecialHours(specialOpeningHours)) {
        return null;
    }

    return (
        <>
            <Title level={2} size="m" spacing>
                {specialOpeningHours.title}
            </Title>
            <BodyLong spacing>{specialOpeningHours.text}</BodyLong>
            <table className={bem('special-opening-hours')}>
                <thead>
                    <tr>
                        <th>{getDateTimeTranslations('day')}:</th>
                        <th>{sharedTranslations['openingHours']}</th>
                    </tr>
                </thead>
                <tbody>
                    {specialOpeningHours.hours.map((openingHour, index) => (
                        <tr key={index}>
                            <td>{formatDate(openingHour.date, 'no', true)}</td>
                            <td>
                                {openingHour.status === 'OPEN'
                                    ? `${openingHour.from} - ${openingHour.to}`
                                    : sharedTranslations['closed']}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BodyLong spacing>{specialOpeningHours.footNote}</BodyLong>
        </>
    );
};

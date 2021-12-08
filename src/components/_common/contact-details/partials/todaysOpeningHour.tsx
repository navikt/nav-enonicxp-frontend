import React from 'react';
import { translator } from 'translations';

import { usePageConfig } from 'store/hooks/usePageConfig';

import { findTodaysOpeningHour } from '../contactHelpers';
import { OpeningHour } from 'types/component-props/parts/contact-option';

interface TodaysOpeningHourProps {
    openingHours: OpeningHour[];
}

export const TodaysOpeningHour = ({ openingHours }: TodaysOpeningHourProps) => {
    const { language } = usePageConfig();

    const getContactTranslations = translator('contactPoint', language);
    const sharedTranslations = getContactTranslations('shared');

    const todaysOpeningHour = findTodaysOpeningHour(openingHours);

    const todayOpeningHoursText =
        todaysOpeningHour.status === 'CLOSED'
            ? sharedTranslations['closed']
            : `${todaysOpeningHour.from} - ${todaysOpeningHour.to}`;

    return (
        <>
            {`${sharedTranslations['todaysPhoneOpeningHours']}: ${todayOpeningHoursText}`}
        </>
    );
};

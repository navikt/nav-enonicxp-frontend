import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import { Title, BodyLong, Alert } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { formatDate } from 'utils/datetime';

import { TelephoneData } from 'types/component-props/parts/contact-option';

import { BEM, classNames } from 'utils/classnames';

import './TelephoneDetails.less';
import {
    mergeOpeningHours,
    normalizeWeeklyOpeningHours,
    parsePhoneNumber,
} from './contactHelpers';

const bem = BEM('telephoneDetails');

export const TelephoneDetails = (props: TelephoneData) => {
    const {
        alertText,
        phoneNumber,
        regularOpeningHours,
        specialOpeningHours,
        text,
        title,
    } = props;

    const { language } = usePageConfig();

    // Misc translations
    const getDateTimeTranslations = translator('dateTime', language);
    const getContactTranslations = translator('contactPoint', language);
    const sharedTranslations = getContactTranslations('shared');
    const weekDayNames = getDateTimeTranslations('weekDayNames');

    const getWeekDayName = (day: number) => {
        return weekDayNames[day];
    };

    const shouldShowSpecialHours = () => {
        if (!specialOpeningHours) {
            return false;
        }
        const validFrom = new Date(specialOpeningHours.validFrom);
        const validTo = new Date(specialOpeningHours.validTo);
        const timeNow = new Date();

        return validFrom < timeNow && validTo > timeNow;
    };

    const mergedOpeningHours = mergeOpeningHours(
        regularOpeningHours.hours,
        specialOpeningHours.hours
    );

    const weeklyHours = normalizeWeeklyOpeningHours(mergedOpeningHours);
    const callLabel = getContactTranslations('call');

    return (
        <>
            <Title level={1} size="l" spacing>
                {title}
            </Title>
            <LenkeBase
                className={classNames(bem('phoneNumber'))}
                href={`tel:${phoneNumber?.replace(/\s/g, '')}`}
            >
                {callLabel['title']} {parsePhoneNumber(phoneNumber, language)}
            </LenkeBase>
            {alertText && (
                <Alert
                    size="s"
                    variant="warning"
                    className={classNames(bem('alertText'))}
                >
                    {alertText}
                </Alert>
            )}
            <div className={bem('text')}>
                <BodyLong spacing>{text}</BodyLong>
            </div>
            <Title level={2} size="m" spacing>
                {sharedTranslations['openingHours']}
            </Title>
            <table className={bem('regular-opening-hours')}>
                <thead>
                    <tr>
                        <th>{getDateTimeTranslations('day')}</th>
                        <th>{sharedTranslations['openingHours']}</th>
                    </tr>
                </thead>
                <tbody>
                    {weeklyHours.map((hour, index) => (
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
            {specialOpeningHours && shouldShowSpecialHours() && (
                <>
                    <Title level={2} size="m" spacing>
                        {specialOpeningHours.title}
                    </Title>
                    <BodyLong spacing>{specialOpeningHours.text}</BodyLong>
                    <table className={bem('special-opening-hours')}>
                        <thead>
                            <tr>
                                <th>{getDateTimeTranslations('day')}</th>
                                <th>{sharedTranslations['openingHours']}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specialOpeningHours.hours.map(
                                (openingHour, index) => (
                                    <tr key={index}>
                                        <td>
                                            {formatDate(
                                                openingHour.date,
                                                'no',
                                                true
                                            )}
                                        </td>
                                        <td>
                                            {openingHour.status === 'OPEN'
                                                ? `${openingHour.from} - ${openingHour.to}`
                                                : sharedTranslations['closed']}
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                    <BodyLong spacing>{specialOpeningHours.footNote}</BodyLong>
                </>
            )}
        </>
    );
};

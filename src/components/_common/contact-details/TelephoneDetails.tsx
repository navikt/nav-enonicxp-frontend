import React from 'react';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';
import { Title, BodyLong, Alert } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

import { TelephoneData } from 'types/component-props/parts/contact-option';

import { BEM, classNames } from 'utils/classnames';

import './TelephoneDetails.less';
import {
    mergeOpeningHours,
    getThisWeeksOpeningHours,
    parsePhoneNumber,
} from './contactHelpers';
import { SpecialOpeningHours } from './partials/specialOpeningHours';
import { CallingCosts } from './partials/callingCosts';

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

    const allOpeningHours = mergeOpeningHours(
        regularOpeningHours?.hours,
        specialOpeningHours?.hours
    );

    const thisWeeksOpeningHours = getThisWeeksOpeningHours(allOpeningHours);
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
                    {thisWeeksOpeningHours.map((hour, index) => (
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
            <SpecialOpeningHours specialOpeningHours={specialOpeningHours} />
            <CallingCosts />
        </>
    );
};

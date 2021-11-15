import { translator } from 'translations';
import { Title, BodyLong, Accordion, BodyShort } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { TelephoneData } from '../../../types/component-props/parts/contact-option';

import { BEM, classNames } from 'utils/classnames';

import {
    dateDiff,
    formatDate,
    getCurrentISODate,
    getDayNameFromNumber,
} from 'utils/datetime';

import './CallOption.less';

const bem = BEM('callOption');

interface CallOptionProps extends TelephoneData {
    ingress: string;
}

export const CallOption = (props: CallOptionProps) => {
    const {
        phoneNumber,
        regularOpeningHours,
        specialOpeningHours,
        text,
        ingress,
        title,
    } = props;

    const { language } = usePageConfig();

    const getDateTimeTranslations = translator('dateTime', language);
    const weekDayNames = getDateTimeTranslations('weekDayNames');
    const relatives = getDateTimeTranslations('relatives');

    const getContactTranslations = translator('contactPoint', language);
    const sharedTranslations = getContactTranslations('shared');

    const getWeekDayName = (day: number) => {
        return weekDayNames[day];
    };

    const getIsClosingSoonText = (mins: number): string => {
        if (mins < 5) {
            return sharedTranslations['closingNow'];
        }
        if (mins < 31) {
            return sharedTranslations['closingInAbout'].replace('{$1}', mins);
        }

        return '';
    };

    const prioritizeAndMergeOpeningHours = () => {
        const totalDaysToCheck = 7 + specialOpeningHours.hours.length;
        const today = Date.now();
        const openingHours = [];

        for (let day = 0; day < totalDaysToCheck; day++) {
            const dayToCheck = new Date(today + 86400000 * day);
            const dayToCheckISO = dayToCheck.toISOString().split('T')[0];
            const nameOfDay = getDayNameFromNumber(dayToCheck.getDay());

            // Special opening hours take precidence, so check these first.
            const specialOpeningHour = specialOpeningHours.hours.find(
                (hour) => hour.date === dayToCheckISO
            );

            if (specialOpeningHour) {
                openingHours.push(specialOpeningHour);
                continue;
            }

            // No special hours were found for this particular date, so
            // look at regular opening hours
            const regularOpeningHour = regularOpeningHours.hours.find(
                (hour) => hour.day === nameOfDay
            );

            if (regularOpeningHour.status === 'OPEN') {
                openingHours.push({
                    ...regularOpeningHour,
                    date: dayToCheckISO,
                });
            }
        }

        return openingHours;
    };

    const findTodaysOpeningHour = () => {
        const today = new Date();
        const todayISO = today.toISOString().split('T')[0];
        const allOpeningHours = prioritizeAndMergeOpeningHours();

        const todaysOpeningHour = allOpeningHours.find(
            (hour) => hour.date === todayISO
        );

        return todaysOpeningHour;
    };

    const findNextOpeningDayAfterToday = () => {
        const today = new Date();
        const todayISO = today.toISOString().split('T')[0];
        const allOpeningHours = prioritizeAndMergeOpeningHours();

        for (let day = 0; day < allOpeningHours.length; day++) {
            const openingHour = allOpeningHours[day];
            if (openingHour.status === 'OPEN' && openingHour.date > todayISO) {
                return openingHour;
            }
        }

        return null;
    };

    const buildOpeningSoonString = (time: string) => {
        const opensTemplate = sharedTranslations['opensAt'];
        const todayTemplate = relatives['today'];

        return `${opensTemplate
            .replace('{$1}', todayTemplate)
            .replace('{$2}', time)}`;
    };

    const buildFutureOpenString = (date: string, time: string) => {
        const daysToNextOpeningHour = dateDiff(date, getCurrentISODate());

        const closedNowTemplate = sharedTranslations['closedNow'];
        const opensTemplate = sharedTranslations['opensAt'];
        const todayTemplate = relatives['today'];
        const tomorrowTemplate = relatives['tomorrow'];

        if (daysToNextOpeningHour > 1) {
            return `${closedNowTemplate} - ${opensTemplate
                .replace('{$1}', formatDate(date, language))
                .replace('{$2}', time)}`;
        }

        const dayTemplate =
            daysToNextOpeningHour === 0 ? todayTemplate : tomorrowTemplate;

        return opensTemplate.replace('{$1}', dayTemplate).replace('{$2}', time);
    };

    const buildOpenInformationText = (openingHours) => {
        if (!openingHours) {
            return '';
        }
        const { from, to } = openingHours;
        const currentISODate = getCurrentISODate();
        const currentTime = Date.now();

        const startOfDay = new Date(
            `${currentISODate}T00:00:00+01:00`
        ).getTime();
        const endOfDay = new Date(`${currentISODate}T23:59:59+01:00`).getTime();
        const fromTime = new Date(`${currentISODate}T${from}+01:00`).getTime();
        const toTime = new Date(`${currentISODate}T${to}+01:00`).getTime();

        const isOpen = currentTime > fromTime && currentTime < toTime;
        const isOpenText = isOpen
            ? sharedTranslations['openNow']
            : sharedTranslations['closedNow'];

        const minutesToClosing = Math.round((toTime - currentTime) / 60000);
        const isClosingSoon = isOpen && minutesToClosing < 31;

        const isClosedForToday = toTime < currentTime && toTime < endOfDay;

        const isOpeningSoon =
            startOfDay < currentTime && currentTime < fromTime;

        const closingSoonText = getIsClosingSoonText(minutesToClosing);

        if (isClosingSoon) {
            return `${isOpenText} - ${closingSoonText}`;
        }

        if (isClosedForToday) {
            const nextOpeningHour = findNextOpeningDayAfterToday();

            return buildFutureOpenString(
                nextOpeningHour.date,
                nextOpeningHour.from
            );
        }

        if (isOpeningSoon) {
            return buildOpeningSoonString(from);
        }
        return `${isOpenText}: ${from} - ${to}`;
    };

    const shouldShowSpecialHours = () => {
        const validFrom = new Date(specialOpeningHours.validFrom);
        const validTo = new Date(specialOpeningHours.validTo);
        const timeNow = new Date();

        return validFrom < timeNow && validTo > timeNow;
    };

    return (
        <div className={classNames(bem())}>
            <LenkeBase
                className={classNames(bem())}
                href={`tel:${phoneNumber?.replace(/\s/g, '')}`}
            >
                <div
                    className={classNames(
                        'defaultOption__icon',
                        'defaultOption__icon--call'
                    )}
                />
                <Title level={2} size="m" className={bem('title')}>
                    {title}
                </Title>
            </LenkeBase>
            <BodyLong className={bem('text')} spacing>
                {ingress || text}
            </BodyLong>
            {regularOpeningHours && (
                <div className={classNames(bem('regular-openinghours'))}>
                    <Title level={2} size="s">
                        {specialOpeningHours
                            ? sharedTranslations['generalOpeningHours']
                            : sharedTranslations['openingHours']}
                    </Title>
                    <Accordion
                        heading={
                            <BodyShort>
                                {buildOpenInformationText(
                                    findTodaysOpeningHour()
                                )}
                            </BodyShort>
                        }
                    >
                        <table className={bem('openingHoursTable')}>
                            <tbody>
                                {regularOpeningHours.hours.map(
                                    (hour, index) => (
                                        <tr key={index}>
                                            <td>{getWeekDayName(index)}</td>
                                            <td>
                                                {hour.status === 'OPEN'
                                                    ? `${hour.from} - ${hour.to}`
                                                    : sharedTranslations[
                                                          'closed'
                                                      ]}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </Accordion>
                </div>
            )}
            {specialOpeningHours && shouldShowSpecialHours() && (
                <>
                    <Title level={2} size="s" spacing>
                        {specialOpeningHours.title}
                    </Title>
                    <BodyLong spacing>{specialOpeningHours.text}</BodyLong>
                    <table className={bem('specialOpeningHoursTable')}>
                        <tbody>
                            {specialOpeningHours.hours.map(
                                (openingHour, index) => (
                                    <tr key={index}>
                                        <td>
                                            {formatDate(openingHour.date, 'no')}
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
        </div>
    );
};

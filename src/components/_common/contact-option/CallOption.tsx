import { ContactData } from '../../../types/component-props/parts/contact-option';

import { translator } from 'translations';
import { Title, BodyLong, Accordion, BodyShort } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { LenkeBase } from 'components/_common/lenke/LenkeBase';

import { BEM, classNames } from 'utils/classnames';

import './CallOption.less';
import {
    dateDiff,
    formatDate,
    getCurrentISODate,
    getDayNameFromNumber,
} from 'utils/datetime';

const bem = BEM('callOption');

export const CallOption = (props: ContactData) => {
    const {
        title,
        text,
        phoneNumber,
        channel,
        regularOpeningHours,
        specialOpeningHours,
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

    const findNextOpeningDayFromNow = () => {
        const today = Date.now();
        let nextOpeningDay: any;
        for (let day = 1; day < 5; day++) {
            const nextDay = new Date(today + 86400000 * day);
            const nextDayAsISO = nextDay.toISOString().split('T')[0];
            const nameOfDay = getDayNameFromNumber(nextDay.getDay());

            // Special opening hours take precidence, so check these first.
            const specialOpeningHour = specialOpeningHours.hours.find(
                (hour) => hour.date === nextDayAsISO
            );

            if (specialOpeningHour && specialOpeningHour.status === 'OPEN') {
                nextOpeningDay = specialOpeningHour;
                return { ...nextOpeningDay };
            }

            // If this particular day is special closed, continue loop to next day
            // so not to catch a regular opening hour.
            if (specialOpeningHour && specialOpeningHour.status === 'CLOSED') {
                continue;
            }

            // No special hours were found for this particular date, so
            // look at regular opening hours
            const regularOpeningHour = regularOpeningHours.hours.find(
                (hour) => hour.day === nameOfDay
            );

            if (regularOpeningHour.status === 'OPEN') {
                return { ...regularOpeningHour, date: nextDayAsISO };
            }
        }

        return nextOpeningDay;
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
        const { from, to } = openingHours;
        const currentISODate = getCurrentISODate();
        const currentTime = Date.now();

        const startOfDay = new Date(`${currentISODate}T00:00:00`).getTime();
        const endOfDay = new Date(`${currentISODate}T23:59:59`).getTime();
        const fromTime = new Date(`${currentISODate}T${from}`).getTime();
        const toTime = new Date(`${currentISODate}T${to}`).getTime();

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
            const nextOpeningHour = findNextOpeningDayFromNow();

            return buildFutureOpenString(
                nextOpeningHour.date,
                nextOpeningHour.from
            );
        }

        if (isOpeningSoon) {
            return 'closed now - opening soon';
        }
        return `${isOpenText}: ${from} - ${to}`;
    };

    const getOpeningHoursForToday = () => {
        return { from: '09:00', to: '10:15' };
    };

    return (
        <div className={classNames(bem(), bem('preview-wrapper'))}>
            <LenkeBase
                className={classNames(bem())}
                href={`tel:+47${phoneNumber?.replace(/\s/g, '')}`}
            >
                <div
                    className={classNames(bem('icon'), bem('icon', channel))}
                />
                <Title level={2} size="m" className={bem('title')}>
                    {title}
                </Title>
            </LenkeBase>
            <BodyLong className={bem('text')} spacing>
                {text}
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
                                    getOpeningHoursForToday()
                                )}
                            </BodyShort>
                        }
                    >
                        <table className={bem('openingHoursTable')}>
                            {regularOpeningHours.hours.map((hour, index) => (
                                <tr key={index}>
                                    <td>{getWeekDayName(index)}</td>
                                    <td>
                                        {hour.status === 'OPEN'
                                            ? `${hour.from} - ${hour.to}`
                                            : sharedTranslations['closed']}
                                    </td>
                                </tr>
                            ))}
                        </table>
                    </Accordion>
                </div>
            )}
            {specialOpeningHours && (
                <>
                    <Title level={2} size="s" spacing>
                        {specialOpeningHours.title}
                    </Title>
                    <BodyLong spacing>{specialOpeningHours.text}</BodyLong>
                    <table className={bem('openingHoursTable')}>
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

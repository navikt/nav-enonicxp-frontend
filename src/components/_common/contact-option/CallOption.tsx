import { translator } from 'translations';
import { Title, BodyLong, Alert } from '@navikt/ds-react';

import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { TelephoneData } from '../../../types/component-props/parts/contact-option';

import { BEM, classNames } from 'utils/classnames';
import { dateDiff, formatDate, getCurrentISODate } from 'utils/datetime';

import { stripXpPathPrefix } from 'utils/urls';

import { mergeOpeningHours } from '../contact-details/contactHelpers';

import './CallOption.less';

const bem = BEM('callOption');

interface CallOptionProps extends TelephoneData {
    _path: string;
    ingress: string;
}

export const CallOption = (props: CallOptionProps) => {
    const {
        alertText,
        ingress,
        phoneNumber,
        regularOpeningHours,
        specialOpeningHours,
        text,
        title,
        _path,
    } = props;

    const { language } = usePageConfig();

    const getDateTimeTranslations = translator('dateTime', language);
    const relatives = getDateTimeTranslations('relatives');

    const getContactTranslations = translator('contactPoint', language);
    const sharedTranslations = getContactTranslations('shared');

    const getIsClosingSoonText = (mins: number): string => {
        if (mins < 5) {
            return sharedTranslations['closingNow'];
        }
        if (mins < 31) {
            return sharedTranslations['closingInAbout'].replace('{$1}', mins);
        }

        return '';
    };

    const findTodaysOpeningHour = () => {
        const today = new Date();
        const todayISO = today.toISOString().split('T')[0];
        const allOpeningHours = mergeOpeningHours(
            regularOpeningHours.hours,
            specialOpeningHours.hours
        );

        const todaysOpeningHour = allOpeningHours.find(
            (hour) => hour.date === todayISO
        );

        return todaysOpeningHour;
    };

    const findNextOpeningDayAfterToday = () => {
        const today = new Date();
        const todayISO = today.toISOString().split('T')[0];
        const allOpeningHours = mergeOpeningHours(
            regularOpeningHours.hours,
            specialOpeningHours.hours
        );

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

        const isClosedForToday =
            (toTime < currentTime && toTime < endOfDay) ||
            openingHours.status === 'CLOSED';

        const isOpeningSoon =
            startOfDay < currentTime && currentTime < fromTime;

        const closingSoonText = getIsClosingSoonText(minutesToClosing);

        if (isClosingSoon) {
            return `${isOpenText} - ${closingSoonText}`;
        }

        if (isClosedForToday) {
            const nextOpeningHour = findNextOpeningDayAfterToday();

            const futureOpeningString = buildFutureOpenString(
                nextOpeningHour.date,
                nextOpeningHour.from
            );

            return `${sharedTranslations['closedNow']} • ${futureOpeningString}`;
        }

        if (isOpeningSoon) {
            return buildOpeningSoonString(from);
        }
        return `${isOpenText} • ${from} - ${to}`;
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
            <Title level={3} size="s" className={bem('apningstider')}>
                {sharedTranslations['openingHours']}:
            </Title>
            <div>{buildOpenInformationText(findTodaysOpeningHour())}</div>
            {alertText && (
                <Alert variant="warning" className={bem('alertText')}>
                    {alertText}
                </Alert>
            )}
            <LenkeBase href={stripXpPathPrefix(_path)}>
                {sharedTranslations['seeAllOpeningHours']}
            </LenkeBase>
        </div>
    );
};

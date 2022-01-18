import { translator } from 'translations';
import { Heading, BodyLong, Alert, BodyShort } from '@navikt/ds-react';

import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { TelephoneData } from '../../../types/component-props/parts/contact-option';

import { BEM, classNames } from 'utils/classnames';
import { dateDiff, formatDate, getCurrentISODate } from 'utils/datetime';

import {
    mergeOpeningHours,
    findTodaysOpeningHour,
} from '../contact-details/contactHelpers';

import './CallOption.less';

const bem = BEM('callOption');
const contactUrlNO = '/person/kontakt-oss/nb';
const contactUrlEN = '/person/kontakt-oss/en';

interface CallOptionProps extends TelephoneData {
    _path?: string;
    ingress: string;
}

export const CallOption = (props: CallOptionProps) => {
    const {
        title,
        alertText,
        ingress,
        phoneNumber,
        regularOpeningHours,
        specialOpeningHours,
        text,
    } = props;


    const { language } = usePageConfig();

    const getDateTimeTranslations = translator('dateTime', language);
    const relatives = getDateTimeTranslations('relatives');

    const getContactTranslations = translator('contactPoint', language);
    const sharedTranslations = getContactTranslations('shared');

    const allOpeningHours = mergeOpeningHours(
        regularOpeningHours.hours,
        specialOpeningHours?.hours
    );

    const findNextOpeningDayAfterToday = () => {
        const todayISO = getCurrentISODate();
        const allDays = mergeOpeningHours(
            regularOpeningHours.hours,
            specialOpeningHours?.hours
        );

        for (let day = 0; day < allDays.length; day++) {
            const openingHour = allDays[day];
            if (openingHour.status === 'OPEN' && openingHour.date > todayISO) {
                return openingHour;
            }
        }

        return null;
    };

    const buildOpeningLaterTodayString = (time: string) => {
        const closedNowTemplate = sharedTranslations['closedNow'];
        const opensTemplate = sharedTranslations['opensAt'];
        const todayTemplate = relatives['today'];

        return `${closedNowTemplate} • ${opensTemplate
            .replace('{$1}', todayTemplate)
            .replace('{$2}', time)
            .toLowerCase()}`;
    };

    const buildFutureOpenString = (futureDate: string, futureTime: string) => {
        const daysToNextOpeningHour = dateDiff(futureDate, getCurrentISODate());

        // Pull in template strings from dictionary
        const opensTemplate = sharedTranslations['opensAt'];
        const todayTemplate = relatives['today'];
        const tomorrowTemplate = relatives['tomorrow'];

        if (daysToNextOpeningHour > 1) {
            return `${opensTemplate
                .replace('{$1}', formatDate(futureDate, language))
                .replace('{$2}', futureTime)}`;
        }

        const openingTemplate =
            daysToNextOpeningHour === 0 ? todayTemplate : tomorrowTemplate;

        return opensTemplate.replace('{$1}', openingTemplate).replace('{$2}', futureTime);
    };

    const buildOpenInformationText = (openingHours) => {
        if (!openingHours) {
            return '';
        }
        const { from, to } = openingHours;

        const currentISODate = getCurrentISODate();
        const currentEpoch = Date.now();

        const startOfToday = new Date(
            `${currentISODate}T00:00:00+01:00`
        ).getTime();
        const endOfToday = new Date(`${currentISODate}T23:59:59+01:00`).getTime();

        const opensEpoch = new Date(`${currentISODate}T${from}+01:00`).getTime();
        const closesEpoch = new Date(`${currentISODate}T${to}+01:00`).getTime();

        // Misc opening / closed states
        const isOpenNow = currentEpoch > opensEpoch && currentEpoch < closesEpoch;
        const isOpeningLaterToday =
            startOfToday < currentEpoch && endOfToday > currentEpoch && currentEpoch < opensEpoch;

        const isClosedForToday =
            (closesEpoch < currentEpoch && closesEpoch < endOfToday) ||
            openingHours.status === 'CLOSED';

        const openClosedText = isOpenNow
            ? sharedTranslations['openNow']
            : sharedTranslations['closedNow'];

        if (isClosedForToday) {
            const nextOpeningHour = findNextOpeningDayAfterToday();

            if (!nextOpeningHour) {
                return 'no opening hour found'
            }

            const futureOpeningString = buildFutureOpenString(
                nextOpeningHour.date,
                nextOpeningHour.from
            );

            return `${openClosedText} • ${futureOpeningString.toLowerCase()}`;
        }

        if (isOpeningLaterToday) {
            return buildOpeningLaterTodayString(from);
        }

        return `${openClosedText} • ${from} - ${to}`;
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
                <Heading level="2" size="medium" className={bem('title')}>
                    {title}
                </Heading>
            </LenkeBase>
            {alertText && (
                <Alert variant="warning" inline className={bem('alertText')}>
                    {alertText}
                </Alert>
            )}
            <BodyLong className={bem('text')} spacing>
                {ingress || text}
            </BodyLong>
            <BodyShort spacing>
                {process.browser && buildOpenInformationText( // Force client side render only
                    findTodaysOpeningHour(allOpeningHours)
                )}
            </BodyShort>
            <LenkeBase href={language === 'no' ? contactUrlNO : contactUrlEN}>
                {sharedTranslations['seeAllOpeningHours']}
            </LenkeBase>
        </div>
    );
};

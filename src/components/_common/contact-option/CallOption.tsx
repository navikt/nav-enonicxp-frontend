import { useState } from 'react';
import { translator } from 'translations';
import { Heading, BodyLong, Alert } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { dateDiff, formatDate, getCurrentISODate } from 'utils/datetime';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { Chip } from '../chip/Chip';
import { usePageConfig } from 'store/hooks/usePageConfig';
import {
    OpeningHour,
    TelephoneData,
} from '../../../types/component-props/parts/contact-option';
import {
    mergeOpeningHours,
    findTodaysOpeningHour,
    getDates,
    getIsClosedForToday,
    getIsCurrentlyClosed,
} from './contactHelpers';
import { AnalyticsEvents } from '../../../utils/amplitude';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';
import { useLayoutEffectClientSide } from '../../../utils/react';
import { ParsedHtml } from '../parsed-html/ParsedHtml';
import { useClientSide } from 'utils/useIsClientSide';

import style from './ContactOption.module.scss';
import { Audience } from 'types/component-props/_mixins';

const contactURLs = {
    person: {
        no: '/kontaktoss#ring-oss',
        en: '/kontaktoss/en#call-us',
    },
    employer: {
        no: '/arbeidsgiver/kontaktoss',
        en: '/kontaktoss/en#call-us',
    },
    provider: {
        no: '/kontaktoss#ring-oss',
        en: '/kontaktoss/en#call-us',
    },
};

interface CallOptionProps extends TelephoneData {
    _path?: string;
    ingress: string;
    audience?: Audience;
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
        audience = Audience.PERSON,
    } = props;
    const { language } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();
    const [isClosed, setIsClosed] = useState<boolean | null>(null);
    const isClientSide = useClientSide();

    const getDateTimeTranslations = translator('dateTime', language);
    const getContactTranslations = translator('contactPoint', language);
    const relatives = getDateTimeTranslations('relatives');
    const sharedTranslations = getContactTranslations('shared');

    const allOpeningHours = mergeOpeningHours(
        regularOpeningHours?.hours || [],
        specialOpeningHours?.hours || []
    );

    const findNextOpeningDayAfterToday = () => {
        const todayISO = getCurrentISODate();

        if (!allOpeningHours) {
            return null;
        }
        for (let day = 0; day < allOpeningHours.length; day++) {
            const openingHour = allOpeningHours[day];
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
                .replace('{$1}', formatDate({ datetime: futureDate, language }))
                .replace('{$2}', futureTime)}`;
        }
        const openingTemplate =
            daysToNextOpeningHour === 0 ? todayTemplate : tomorrowTemplate;

        return opensTemplate
            .replace('{$1}', openingTemplate)
            .replace('{$2}', futureTime);
    };

    const getContactUrl = () => {
        const audienceUrls = contactURLs[audience];
        return language === 'no' || language === 'se'
            ? audienceUrls.no
            : audienceUrls.en;
    };

    const buildOpenInformationText = (openingHour: OpeningHour) => {
        if (!getDates(openingHour)) {
            return true;
        }

        const {
            closesEpoch,
            currentEpoch,
            endOfToday,
            opensEpoch,
            startOfToday,
        } = getDates(openingHour);
        const { from, to } = openingHour;

        // Misc opening / closed states
        const isOpenNow =
            currentEpoch > opensEpoch && currentEpoch < closesEpoch;
        const isOpeningLaterToday =
            startOfToday < currentEpoch &&
            endOfToday > currentEpoch &&
            currentEpoch < opensEpoch;
        const isClosedForToday = getIsClosedForToday(openingHour);
        const openClosedText = isOpenNow
            ? sharedTranslations['openNow']
            : sharedTranslations['closedNow'];

        if (isClosedForToday) {
            const nextOpeningHour = findNextOpeningDayAfterToday();
            if (!nextOpeningHour) {
                return 'no opening hour found';
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

        return `${openClosedText}`;
    };

    const todaysOpeningHour = isClientSide
        ? findTodaysOpeningHour(allOpeningHours)
        : null;

    const isCurrentlyClosed = getIsCurrentlyClosed(todaysOpeningHour);

    useLayoutEffectClientSide(() => {
        setIsClosed(isCurrentlyClosed);
    }, [isCurrentlyClosed]);

    return (
        <div className={style.contactOption}>
            <LenkeBase
                href={`tel:${phoneNumber?.replace(/\s/g, '')}`}
                className={style.link}
                analyticsEvent={AnalyticsEvents.CALL}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
            >
                <div className={style.linkContent}>
                    <div className={classNames(style.icon, style.call)} />
                    <Heading level="3" size="small" className={style.link}>
                        {title}
                    </Heading>
                </div>
            </LenkeBase>
            {alertText && (
                <Alert variant="warning" inline className={style.alert}>
                    {alertText}
                </Alert>
            )}
            <BodyLong className={style.text}>
                <ParsedHtml htmlProps={ingress || text} />
            </BodyLong>
            {isClosed !== null && (
                <Chip
                    className={classNames(
                        style.openingStatus,
                        isClosed ? style.closed : style.open
                    )}
                >
                    {buildOpenInformationText(todaysOpeningHour)}
                </Chip>
            )}
            <LenkeBase
                analyticsLinkGroup={layoutConfig.title}
                className={style.moreLink}
                href={getContactUrl()}
            >
                {sharedTranslations['seeMoreOptions']}
            </LenkeBase>
        </div>
    );
};

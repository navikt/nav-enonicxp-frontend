import React from 'react';
import { translator } from 'translations';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { TelephoneData } from 'types/component-props/parts/contact-option';
import { AnalyticsEvents } from 'utils/amplitude';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';
import { ParsedHtml } from '../parsed-html/ParsedHtml';
import { OpeningInfo } from 'components/_common/contact-option/opening-info/OpeningInfo';
import { Audience, getAudience } from 'types/component-props/_mixins';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import {
    iconWithTwoStates,
    useHoverAndFocus,
} from './opening-info/helpers/iconUtils';

import style from './ContactOption.module.scss';

const contactURLs: Record<Audience, Record<'no' | 'en', string>> = {
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

type CallOptionProps = {
    ingress?: ProcessedHtmlProps;
} & TelephoneData;

export const CallOption = (props: CallOptionProps) => {
    const {
        title,
        alertText,
        ingress,
        phoneNumber,
        regularOpeningHours,
        specialOpeningHours,
        text,
        audience,
    } = props;

    const { overrideText } = specialOpeningHours;

    const { language } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();

    const getContactTranslations = translator('contactPoint', language);

    const callTranslations = getContactTranslations('call');
    const sharedTranslations = getContactTranslations('shared');

    const getContactUrl = () => {
        const audienceUrls = audience
            ? contactURLs[getAudience(audience)]
            : null;
        if (!audienceUrls) {
            return contactURLs.person.no;
        }

        return language === 'no' || language === 'nn' || language === 'se'
            ? audienceUrls.no
            : audienceUrls.en;
    };

    const [isActive, bind] = useHoverAndFocus();

    return (
        <div className={style.contactOption}>
            <LenkeBase
                href={`tel:${phoneNumber?.replace(/\s/g, '')}`}
                className={style.link}
                analyticsEvent={AnalyticsEvents.CALL}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
                {...bind}
            >
                <div className={style.linkContent}>
                    {iconWithTwoStates('phone', isActive)}
                    <Heading level="3" size="small" className={style.link}>
                        {title || callTranslations.title}
                    </Heading>
                </div>
            </LenkeBase>
            {alertText && (
                <Alert variant="warning" inline className={style.alert}>
                    {alertText}
                </Alert>
            )}
            <BodyLong className={style.text}>
                <ParsedHtml
                    htmlProps={
                        overrideText ||
                        ingress ||
                        text ||
                        callTranslations.ingress
                    }
                />
            </BodyLong>
            {!alertText && regularOpeningHours && specialOpeningHours && (
                <OpeningInfo
                    regularOpeningHours={regularOpeningHours}
                    specialOpeningHours={specialOpeningHours}
                />
            )}
            <LenkeBase
                analyticsLinkGroup={layoutConfig.title}
                className={style.moreLink}
                href={getContactUrl()}
            >
                {sharedTranslations.seeMoreOptions}
            </LenkeBase>
        </div>
    );
};

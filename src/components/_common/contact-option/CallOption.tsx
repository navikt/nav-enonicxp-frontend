import React from 'react';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { AnalyticsEvents } from 'utils/amplitude';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import { OpeningInfo } from 'components/_common/contact-option/opening-info/OpeningInfo';
import { Audience, getAudience } from 'types/component-props/_mixins';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { usePageContentProps } from 'store/pageContext';
import { hoverFocusIcon, useHoverAndFocus } from './opening-info/helpers/iconUtils';

import style from './ContactOption.module.scss';
import { TelephoneData } from 'components/parts/contact-option/ContactOptionPart';

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
} as const;

type Props = {
    ingress?: ProcessedHtmlProps;
} & TelephoneData;

export const CallOption = ({
    title,
    alertText,
    ingress,
    phoneNumber,
    regularOpeningHours,
    specialOpeningHours,
    text,
    audience,
}: Props) => {
    const overrideText = specialOpeningHours?.overrideText;

    const { language } = usePageContentProps();
    const { layoutConfig } = useLayoutConfig();

    const getContactTranslations = translator('contactPoint', language);

    const callTranslations = getContactTranslations('call');
    const sharedTranslations = getContactTranslations('shared');

    const getContactUrl = () => {
        const audienceUrls = audience ? contactURLs[getAudience(audience)] : null;
        if (!audienceUrls) {
            return contactURLs.person.no;
        }

        return language === 'no' || language === 'nn' || language === 'se'
            ? audienceUrls.no
            : audienceUrls.en;
    };

    const { handlers, isActive } = useHoverAndFocus();

    return (
        <div className={style.contactOption}>
            <LenkeBase
                href={`tel:${phoneNumber?.replace(/\s/g, '')}`}
                className={style.link}
                analyticsEvent={AnalyticsEvents.CALL}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
                {...handlers}
            >
                <div className={style.linkContent}>
                    {hoverFocusIcon({
                        iconDefault: 'phone.svg',
                        iconActive: 'phone-filled.svg',
                        isActive: isActive,
                        style: style.icon,
                    })}
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
                    htmlProps={overrideText || ingress || text || callTranslations.ingress}
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

import React from 'react';
import { Alert, BodyLong, BodyShort, Heading } from '@navikt/ds-react';
import { translator } from 'translations';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { AnalyticsEvents } from 'utils/analytics';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { OpeningInfo } from 'components/_common/contact-option/openingInfo/OpeningInfo';
import { Audience, getAudience } from 'types/component-props/_mixins';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { usePageContentProps } from 'store/pageContext';
import { TelephoneData } from 'components/parts/contact-option/ContactOptionPart';
import { Icon } from 'components/_common/contact-option/icon/Icon';

import sharedStyle from 'components/_common/contact-option/ContactOption.module.scss';
import alertStyle from 'components/_common/contact-option/Alert.module.scss';
import style from './CallOption.module.scss';

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
    hideMoreLink,
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

    return (
        <div className={sharedStyle.contactOption}>
            <Icon type="phone" />
            <div className={sharedStyle.content}>
                <LenkeBase
                    href={`tel:${phoneNumber?.replace(/\s/g, '')}`}
                    className={sharedStyle.link}
                    analyticsEvent={AnalyticsEvents.CALL}
                    analyticsLinkGroup={layoutConfig.title}
                    analyticsComponent={'Kontakt-oss kanal'}
                >
                    <Heading level="3" size="small">
                        {title || callTranslations.title}
                    </Heading>
                </LenkeBase>
                {alertText && (
                    <Alert variant="warning" inline className={alertStyle.alert}>
                        {alertText}
                    </Alert>
                )}
                <BodyLong className={sharedStyle.text}>
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
                    {!hideMoreLink && (
                        <BodyShort as="span">{sharedTranslations.seeMoreOptions}</BodyShort>
                    )}
                </LenkeBase>
            </div>
        </div>
    );
};

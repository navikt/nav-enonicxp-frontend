import React from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import { ContactOptionLayout } from 'components/_common/contact-option/_shared-utils/ContactOptionLayout/ContactOptionLayout';
import { translator } from 'translations';
import { ContactOptionAlert } from 'components/_common/contact-option/_shared-utils/ContactOptionAlert/ContactOptionAlert';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { AnalyticsEvents } from 'utils/analytics';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { OpeningInfo } from 'components/_common/contact-option/_shared-utils/openingInfo/OpeningInfo';
import { Audience, getAudience } from 'types/component-props/_mixins';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { usePageContentProps } from 'store/pageContext';
import { TelephoneData } from 'components/parts/contact-option/ContactOptionPart';
import { Icon } from 'components/_common/contact-option/_shared-utils/icon/Icon';
import { ContactOptionIngress } from 'components/_common/contact-option/_shared-utils/ContactOptionIngress/ContactOptionIngress';
import { ContactOptionLenkebase } from 'components/_common/contact-option/_shared-utils/ContactOptionLenkebase/ContactOptionLenkebase';

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
        <ContactOptionLayout icon={<Icon type="phone" />}>
            <ContactOptionLenkebase
                href={`tel:${phoneNumber?.replace(/\s/g, '')}`}
                analyticsEvent={AnalyticsEvents.CALL}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
            >
                <Heading level="3" size="small">
                    {title || callTranslations.title}
                </Heading>
            </ContactOptionLenkebase>
            {alertText && <ContactOptionAlert alertText={alertText} />}
            <ContactOptionIngress
                htmlProps={overrideText || ingress || text || callTranslations.ingress}
            />
            {!alertText && regularOpeningHours && specialOpeningHours && (
                <OpeningInfo
                    regularOpeningHours={regularOpeningHours}
                    specialOpeningHours={specialOpeningHours}
                />
            )}
            {!hideMoreLink && (
                <LenkeBase
                    analyticsLinkGroup={layoutConfig.title}
                    className={style.moreLink}
                    href={getContactUrl()}
                >
                    <BodyShort as="span">{sharedTranslations.seeMoreOptions}</BodyShort>
                </LenkeBase>
            )}
        </ContactOptionLayout>
    );
};

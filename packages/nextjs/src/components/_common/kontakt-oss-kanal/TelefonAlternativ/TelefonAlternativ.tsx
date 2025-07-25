import React from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import { KontaktOssKanalLayout } from 'components/_common/kontakt-oss-kanal/_shared-utils/KontaktOssKanalLayout/KontaktOssKanalLayout';
import { translator } from 'translations';
import { KontaktOssKanalAlert } from 'components/_common/kontakt-oss-kanal/_shared-utils/KontaktOssKanalAlert/KontaktOssKanalAlert';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { AnalyticsEvents } from 'utils/analytics';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { OpeningInfo } from 'components/_common/kontakt-oss-kanal/_shared-utils/openingInfo/OpeningInfo';
import { Audience, getAudience } from 'types/component-props/_mixins';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import { usePageContentProps } from 'store/pageContext';
import { TelephoneData } from 'components/parts/kontakt-oss-kanal/KontaktOssKanalPart';
import { Icon } from 'components/_common/kontakt-oss-kanal/_shared-utils/icon/Icon';
import { KontaktOssKanalIngress } from 'components/_common/kontakt-oss-kanal/_shared-utils/KontaktOssKanalIngress/KontaktOssKanalIngress';
import { KontaktOssKanalLenkebase } from 'components/_common/kontakt-oss-kanal/_shared-utils/KontaktOssKanalLenkebase/KontaktOssKanalLenkebase';

import style from './TelefonAlternativ.module.scss';

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

export const TelefonAlternativ = ({
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
        <KontaktOssKanalLayout icon={<Icon type="phone" />}>
            <KontaktOssKanalLenkebase
                href={`tel:${phoneNumber?.replace(/\s/g, '')}`}
                analyticsEvent={AnalyticsEvents.CALL}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
            >
                <Heading level="3" size="small">
                    {title || callTranslations.title}
                </Heading>
            </KontaktOssKanalLenkebase>
            {alertText && <KontaktOssKanalAlert alertText={alertText} />}
            <KontaktOssKanalIngress
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
        </KontaktOssKanalLayout>
    );
};

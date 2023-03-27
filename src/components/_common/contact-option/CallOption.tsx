import React from 'react';
import { translator } from 'translations';
import { Heading, BodyLong, Alert } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { TelephoneData } from 'types/component-props/parts/contact-option';
import { AnalyticsEvents } from 'utils/amplitude';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';
import { ParsedHtml } from '../parsed-html/ParsedHtml';
import { OpeningInfo } from 'components/_common/contact-option/opening-info/OpeningInfo';
import { Audience } from 'types/component-props/_mixins';

import style from './ContactOption.module.scss';

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

type CallOptionProps = {
    _path?: string;
    ingress: string;
    audience?: Audience;
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
        audience = Audience.PERSON,
    } = props;

    const { language } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();

    const getContactTranslations = translator('contactPoint', language);
    const sharedTranslations = getContactTranslations('shared');

    const getContactUrl = () => {
        const audienceUrls = contactURLs[audience];
        if (!audienceUrls) {
            return contactURLs.person.no;
        }
        return language === 'no' || language === 'se'
            ? audienceUrls.no
            : audienceUrls.en;
    };

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
            <OpeningInfo
                regularOpeningHours={regularOpeningHours}
                specialOpeningHours={specialOpeningHours}
            />
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

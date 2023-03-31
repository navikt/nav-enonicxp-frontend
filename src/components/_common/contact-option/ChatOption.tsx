import React from 'react';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { ChatData } from 'types/component-props/parts/contact-option';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { classNames } from 'utils/classnames';
import { AnalyticsEvents } from 'utils/amplitude';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { ParsedHtml } from '../parsed-html/ParsedHtml';

import style from './ContactOption.module.scss';
import TextWithIndicator from '../text-with-indicator/TextWithIndicator';
import { OpeningInfo } from './opening-info/OpeningInfo';

export const ChatOption = (props: ChatData) => {
    const {
        ingress,
        title,
        alertText,
        regularOpeningHours,
        specialOpeningHours,
    } = props;
    const { language } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();
    const getTranslations = translator('contactPoint', language);

    const getTitle = () => {
        const dictionaryTitle = getTranslations('chat').title;
        return title || dictionaryTitle;
    };

    const getIngress = () => {
        const dictionaryIngress = getTranslations('chat').ingress;
        return ingress || dictionaryIngress;
    };

    return (
        <div className={style.contactOption}>
            <LenkeBase
                onClick={(e) => {
                    e.preventDefault();
                    openChatbot();
                }}
                href="#"
                analyticsEvent={AnalyticsEvents.CHAT_OPEN}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
                className={style.link}
            >
                <div className={style.linkContent}>
                    <div className={classNames(style.icon, style.chat)} />
                    <Heading level="3" size="small">
                        {getTitle()}
                    </Heading>
                </div>
            </LenkeBase>
            {alertText && (
                <Alert variant="warning" inline className={style.alert}>
                    {alertText}
                </Alert>
            )}
            <BodyLong as="div" className={style.text}>
                <ParsedHtml htmlProps={getIngress()} />
            </BodyLong>
            <TextWithIndicator
                text={`${getTranslations('chat').alwaysOpen}`}
                prefix={'Chatbot:'}
                isActive={true}
            />
            <OpeningInfo
                regularOpeningHours={regularOpeningHours}
                specialOpeningHours={specialOpeningHours}
                textPrefix={`${getTranslations('chat').chatWithCounsellor}:`}
            />
        </div>
    );
};

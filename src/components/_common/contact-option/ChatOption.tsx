import React from 'react';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { AnalyticsEvents } from 'utils/amplitude';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { ParsedHtml } from 'components/_common/parsed-html/ParsedHtml';
import TextWithIndicator from 'components/_common/text-with-indicator/TextWithIndicator';
import { ChatData } from 'components/parts/contact-option/ContactOptionPart';
import { Icon } from 'components/_common/contact-option/Icon';
import { OpeningInfo } from './opening-info/OpeningInfo';

import style from './ContactOption.module.scss';

export const ChatOption = (props: ChatData) => {
    const { ingress, title, alertText, regularOpeningHours, specialOpeningHours } = props;
    const overrideText = specialOpeningHours?.overrideText;

    const { language } = usePageContentProps();
    const { layoutConfig } = useLayoutConfig();

    const translations = translator('contactPoint', language)('chat');

    return (
        <div className={style.contactOption}>
            <Icon type="chat" />
            <div className={style.content}>
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
                    <Heading level="3" size="small">
                        {title || translations.title}
                    </Heading>
                </LenkeBase>
                {alertText && (
                    <Alert variant="warning" inline className={style.alert}>
                        {alertText}
                    </Alert>
                )}
                <BodyLong as="div" className={style.text}>
                    <ParsedHtml htmlProps={overrideText || ingress || translations.ingress} />
                </BodyLong>
                {!alertText && (
                    <TextWithIndicator
                        text={translations.alwaysOpen}
                        prefix={'Chatbot:'}
                        isActive={true}
                    />
                )}
                {!alertText && regularOpeningHours && specialOpeningHours && (
                    <OpeningInfo
                        regularOpeningHours={regularOpeningHours}
                        specialOpeningHours={specialOpeningHours}
                        textPrefix={`${translations.chatWithCounsellor}:`}
                    />
                )}
            </div>
        </div>
    );
};

import React from 'react';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { ChatData } from 'types/component-props/parts/contact-option';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { AnalyticsEvents } from 'utils/amplitude';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { ParsedHtml } from '../parsed-html/ParsedHtml';
import TextWithIndicator from '../text-with-indicator/TextWithIndicator';
import { OpeningInfo } from './opening-info/OpeningInfo';
import {
    iconWithTwoStates,
    useHoverAndFocus,
} from './opening-info/helpers/iconUtils';

import style from './ContactOption.module.scss';

export const ChatOption = (props: ChatData) => {
    const {
        ingress,
        title,
        alertText,
        regularOpeningHours,
        specialOpeningHours,
    } = props;
    const overrideText = specialOpeningHours?.overrideText;

    const { language } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();

    const translations = translator('contactPoint', language)('chat');

    const [isActive, bind] = useHoverAndFocus();

    const appOrigin = process.env.APP_ORIGIN;

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
                {...bind}
            >
                <div className={style.linkContent}>
                    {iconWithTwoStates(
                        `${appOrigin}/gfx/chat.svg`,
                        `${appOrigin}/gfx/chat-filled.svg`,
                        isActive
                    )}
                    <Heading level="3" size="small">
                        {title || translations.title}
                    </Heading>
                </div>
            </LenkeBase>
            {alertText && (
                <Alert variant="warning" inline className={style.alert}>
                    {alertText}
                </Alert>
            )}
            <BodyLong as="div" className={style.text}>
                <ParsedHtml
                    htmlProps={overrideText || ingress || translations.ingress}
                />
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
    );
};

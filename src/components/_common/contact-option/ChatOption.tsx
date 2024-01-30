import React, { useState } from 'react';
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
import TextWithIndicator from '../text-with-indicator/TextWithIndicator';
import { OpeningInfo } from './opening-info/OpeningInfo';

import style from './ContactOption.module.scss';

export default function useHoverAndFocus(): [
    //TODO gjenbruk
    boolean,
    {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onFocus: () => void;
        onBlur: () => void;
    },
] {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const bind = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
    };

    return [isHovered || isFocused, bind];
}

const iconWithTwoStates = (
    defaultImg: string,
    activeImg: string,
    isActive: boolean
) => (
    <>
        <img
            alt=""
            className={classNames(style.icon)}
            src={defaultImg}
            style={{
                display: isActive ? 'none' : 'block',
            }}
        />
        <img
            alt=""
            className={classNames(style.icon)}
            src={activeImg}
            style={{
                display: isActive ? 'block' : 'none',
            }}
        />
    </>
);

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
                        'https://www.nav.no/gfx/chat.svg',
                        'https://www.nav.no/gfx/chat-filled.svg',
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

import React, { useEffect, useState } from 'react';
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

// preloadImages.js
function preloadImages(imageUrls) {
    return imageUrls.map((imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
        return img;
    });
}
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

    const [isHovered, setIsHovered] = React.useState(false);

    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(
            preloadImages([
                'https://www.nav.no/gfx/chat-filled.svg',
                'https://www.nav.no/gfx/chat.svg',
                // ... other images ...
            ])
        );
    }, []);

    // Find the preloaded images
    const chatFilledImg = images.find(
        (img) => img.src === 'https://www.nav.no/gfx/chat-filled.svg'
    );
    const chatImg = images.find(
        (img) => img.src === 'https://www.nav.no/gfx/chat.svg'
    );

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
                <div
                    className={style.linkContent}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        alt=""
                        className={classNames(style.icon, style.chat)}
                        src={isHovered ? chatFilledImg?.src : chatImg?.src}
                    />
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

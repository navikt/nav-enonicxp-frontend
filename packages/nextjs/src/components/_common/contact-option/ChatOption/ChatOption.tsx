import React from 'react';
import { Alert, BodyLong, Heading } from '@navikt/ds-react';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { AnalyticsEvents } from 'utils/analytics';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import TextWithIndicator from 'components/_common/textWithIndicator/TextWithIndicator';
import { Button } from 'components/_common/button/Button';
import { ChatData } from 'components/parts/contact-option/ContactOptionPart';
import { Icon } from 'components/_common/contact-option/icon/Icon';
import { OpeningInfo } from 'components/_common/contact-option/openingInfo/OpeningInfo';

//vet ikke hvorfor denne klager på unused class når den ÅPENBART ikke er unused
// eslint-disable-next-line css-modules/no-unused-class
import sharedStyle from 'components/_common/contact-option/ContactOption.module.scss';
import alertStyle from 'components/_common/contact-option/Alert.module.scss';

export const ChatOption = (props: ChatData) => {
    const { ingress, title, alertText, regularOpeningHours, specialOpeningHours } = props;
    const overrideText = specialOpeningHours?.overrideText;

    const { language } = usePageContentProps();

    const translations = translator('contactPoint', language)('chat');

    return (
        <div className={sharedStyle.contactOption}>
            <Icon type="chat" />
            <div className={sharedStyle.content}>
                <Button
                    onClick={openChatbot}
                    analyticsEvent={AnalyticsEvents.CHAT_OPEN}
                    analyticsComponent={'Kontakt-oss kanal'}
                    lenkestyling
                >
                    <Heading level="3" size="small">
                        {title || translations.title}
                    </Heading>
                </Button>
                {alertText && (
                    <Alert variant="warning" inline className={alertStyle.alert}>
                        {alertText}
                    </Alert>
                )}
                <BodyLong as="div" className={sharedStyle.text}>
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

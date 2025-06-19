import React from 'react';
import { Heading } from '@navikt/ds-react';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { AnalyticsEvents } from 'utils/analytics';
import TextWithIndicator from 'components/_common/textWithIndicator/TextWithIndicator';
import { Button } from 'components/_common/button/Button';
import { ChatData } from 'components/parts/contact-option/ContactOptionPart';
import { Icon } from 'components/_common/contact-option/_shared-utils/icon/Icon';
import { OpeningInfo } from 'components/_common/contact-option/_shared-utils/openingInfo/OpeningInfo';
import { ContactOptionLayout } from 'components/_common/contact-option/_shared-utils/ContactOptionLayout/ContactOptionLayout';
import { ContactOptionAlert } from 'components/_common/contact-option/_shared-utils/ContactOptionAlert/ContactOptionAlert';
import { ContactOptionIngress } from 'components/_common/contact-option/_shared-utils/ContactOptionIngress/ContactOptionIngress';

export const ChatOption = (props: ChatData) => {
    const { ingress, title, alertText, regularOpeningHours, specialOpeningHours } = props;
    const overrideText = specialOpeningHours?.overrideText;

    const { language } = usePageContentProps();

    const translations = translator('contactPoint', language)('chat');

    return (
        <ContactOptionLayout icon={<Icon type="chat" />}>
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
            {alertText && <ContactOptionAlert alertText={alertText} />}
            <ContactOptionIngress htmlProps={overrideText || ingress || translations.ingress} />
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
        </ContactOptionLayout>
    );
};

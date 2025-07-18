import React from 'react';
import { Heading } from '@navikt/ds-react';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { AnalyticsEvents } from 'utils/analytics';
import TextWithIndicator from 'components/_common/textWithIndicator/TextWithIndicator';
import { Button } from 'components/_common/button/Button';
import { ChatData } from 'components/parts/kontakt-oss-kanal/KontaktOssKanalPart';
import { Icon } from 'components/_common/kontakt-oss-kanal/_shared-utils/icon/Icon';
import { OpeningInfo } from 'components/_common/kontakt-oss-kanal/_shared-utils/openingInfo/OpeningInfo';
import { KontaktOssKanalLayout } from 'components/_common/kontakt-oss-kanal/_shared-utils/KontaktOssKanalLayout/KontaktOssKanalLayout';
import { KontaktOssKanalAlert } from 'components/_common/kontakt-oss-kanal/_shared-utils/KontaktOssKanalAlert/KontaktOssKanalAlert';
import { KontaktOssKanalIngress } from 'components/_common/kontakt-oss-kanal/_shared-utils/KontaktOssKanalIngress/KontaktOssKanalIngress';

export const ChatAlternativ = (props: ChatData) => {
    const { ingress, title, alertText, regularOpeningHours, specialOpeningHours } = props;
    const overrideText = specialOpeningHours?.overrideText;

    const { language } = usePageContentProps();

    const translations = translator('contactPoint', language)('chat');

    return (
        <KontaktOssKanalLayout icon={<Icon type="chat" />}>
            <Button
                onClick={openChatbot}
                analyticsEvent={AnalyticsEvents.CHAT_OPEN}
                analyticsComponent={'Kontakt-oss kanal'}
                lenkestyling
                typeButton
            >
                <Heading level="3" size="small">
                    {title || translations.title}
                </Heading>
            </Button>
            {alertText && <KontaktOssKanalAlert alertText={alertText} />}
            <KontaktOssKanalIngress htmlProps={overrideText || ingress || translations.ingress} />
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
        </KontaktOssKanalLayout>
    );
};

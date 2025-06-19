import React from 'react';
import { Heading } from '@navikt/ds-react';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { AnalyticsEvents } from 'utils/analytics';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import Config from 'config';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { ChannelType, DefaultContactData } from 'components/parts/contact-option/ContactOptionPart';
import { Icon } from 'components/_common/contact-option/_shared-utils/icon/Icon';
import { Button } from 'components/_common/button/Button';
import { ContactOptionLayout } from 'components/_common/contact-option/_shared-utils/ContactOptionLayout/ContactOptionLayout';
import { ContactOptionIngress } from 'components/_common/contact-option/_shared-utils/ContactOptionIngress/ContactOptionIngress';
import { ContactOptionLenkebase } from 'components/_common/contact-option/_shared-utils/ContactOptionLenkebase/ContactOptionLenkebase';

type Props = DefaultContactData & {
    channel: ChannelType;
};

export const DefaultOption = (props: Props) => {
    const { ingress, channel, title, url, icon } = props;
    const { language } = usePageContentProps();
    const { layoutConfig } = useLayoutConfig();
    const getTranslations = translator('contactPoint', language);

    const getUrlOrClickHandler = (
        channel: ChannelType
    ): Partial<React.ComponentProps<typeof LenkeBase>> & { href: string } => {
        switch (channel) {
            case 'write':
                return {
                    href: url || Config.urls.skrivTilOss,
                };

            case 'call':
                return {
                    href: Config.urls.hovedNummerTlf,
                    analyticsEvent: AnalyticsEvents.CALL,
                };

            case 'navoffice':
                return {
                    href: ['no', 'nn', 'se'].includes(language)
                        ? Config.urls.sokNavKontor
                        : Config.urls.sokNavKontorEn,
                    target: '_blank',
                };

            case 'aidcentral':
                return {
                    href: Config.urls.kontaktHjelpemiddelSentral,
                    target: '_blank',
                };

            case 'custom':
                return {
                    href: url || '#',
                    target: '_blank',
                    analyticsEvent: AnalyticsEvents.NAVIGATION,
                };

            default:
                return { href: '#' };
        }
    };

    const channelIsNotCustom = channel !== 'custom';

    const titleActual = title || (channelIsNotCustom ? getTranslations(channel).title : null);
    const ingressActual = ingress || (channelIsNotCustom ? getTranslations(channel).ingress : null);
    const iconName = icon || 'place';

    return (
        <ContactOptionLayout icon={<Icon type={iconName} />}>
            {channel === 'chat' ? (
                <Button
                    variant="tertiary"
                    onClick={(e) => {
                        e.preventDefault();
                        openChatbot();
                    }}
                    analyticsEvent={AnalyticsEvents.CHAT_OPEN}
                    analyticsComponent="Kontakt-oss kanal"
                    lenkestyling
                >
                    {titleActual ? (
                        <Heading level="3" size="small">
                            {titleActual}
                        </Heading>
                    ) : (
                        <EditorHelp text="Tittel mangler!" type="error" />
                    )}
                </Button>
            ) : (
                <ContactOptionLenkebase
                    {...getUrlOrClickHandler(channel)}
                    analyticsLinkGroup={layoutConfig.title}
                    analyticsComponent="Kontakt-oss kanal"
                >
                    {titleActual ? (
                        <Heading level="3" size="small">
                            {titleActual}
                        </Heading>
                    ) : (
                        <EditorHelp text="Tittel mangler!" type="error" />
                    )}
                </ContactOptionLenkebase>
            )}

            {ingressActual ? (
                <ContactOptionIngress htmlProps={ingressActual} />
            ) : (
                <EditorHelp text="Ingress mangler!" type="error" />
            )}
        </ContactOptionLayout>
    );
};

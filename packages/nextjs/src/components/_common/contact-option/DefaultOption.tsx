import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { translator } from 'translations';
import { usePageContentProps } from 'store/pageContext';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { AnalyticsEvents } from 'utils/analytics';
import { useLayoutConfig } from 'components/layouts/useLayoutConfig';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import Config from 'config';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { ChannelType, DefaultContactData } from 'components/parts/contact-option/ContactOptionPart';
import { Icon } from 'components/_common/contact-option/icon/Icon';

import sharedStyle from './ContactOption.module.scss';

type Props = DefaultContactData & {
    channel: ChannelType;
};

export const DefaultOption = (props: Props) => {
    const { ingress, channel, title, url, icon } = props;
    const { language } = usePageContentProps();
    const { layoutConfig } = useLayoutConfig();
    const getTranslations = translator('contactPoint', language);

    // In order to open chatbot, onClick is needed instead of href. Therefore
    // return an object which is destructed into Lenkebase with the proper props (href | onClick)
    const getUrlOrClickHandler = (
        channel: ChannelType
    ): Partial<React.ComponentProps<typeof LenkeBase>> & { href: string } => {
        if (channel === 'write') {
            return {
                href: url || Config.urls.skrivTilOss,
            };
        }

        if (channel === 'call') {
            return {
                href: Config.urls.hovedNummerTlf,
                analyticsEvent: AnalyticsEvents.CALL,
            };
        }

        if (channel === 'chat') {
            return {
                href: '#',
                onClick: (e) => {
                    e.preventDefault();
                    openChatbot();
                },
                analyticsEvent: AnalyticsEvents.CHAT_OPEN,
            };
        }

        if (channel === 'navoffice') {
            return {
                href:
                    language === 'no' || language === 'nn' || language === 'se'
                        ? Config.urls.sokNavKontor
                        : Config.urls.sokNavKontorEn,
                target: '_blank',
            };
        }

        if (channel === 'aidcentral') {
            return {
                href: Config.urls.kontaktHjelpemiddelSentral,
                target: '_blank',
            };
        }

        if (channel === 'custom') {
            return {
                href: url || '#',
                target: '_blank',
                analyticsEvent: AnalyticsEvents.NAVIGATION,
            };
        }

        return { href: '#' };
    };

    const titleActual = title || (channel !== 'custom' ? getTranslations(channel).title : null);

    const ingressActual =
        ingress || (channel !== 'custom' ? getTranslations(channel).ingress : null);

    const iconName = icon || 'place';

    return (
        <section className={sharedStyle.contactOption}>
            <Icon type={iconName} />
            <div className={sharedStyle.content}>
                <LenkeBase
                    {...getUrlOrClickHandler(channel)}
                    analyticsLinkGroup={layoutConfig.title}
                    analyticsComponent={'Kontakt-oss kanal'}
                    className={sharedStyle.link}
                >
                    {titleActual ? (
                        <Heading level={'3'} size={'small'}>
                            {titleActual}
                        </Heading>
                    ) : (
                        <EditorHelp text={'Tittel mangler!'} type={'error'} />
                    )}
                </LenkeBase>
                {ingressActual ? (
                    <BodyLong as="div" className={sharedStyle.text}>
                        <ParsedHtml htmlProps={ingressActual} />
                    </BodyLong>
                ) : (
                    <EditorHelp text={'Ingress mangler!'} type={'error'} />
                )}
            </div>
        </section>
    );
};

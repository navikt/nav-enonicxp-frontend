import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import {
    ChannelType,
    DefaultContactData,
} from 'types/component-props/parts/contact-option';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { classNames } from 'utils/classnames';
import { AnalyticsEvents } from 'utils/amplitude';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { ParsedHtml } from '../parsed-html/ParsedHtml';
import Config from 'config';

import style from './ContactOption.module.scss';

type NotCustom = Exclude<ChannelType, 'custom'>;

type Props = DefaultContactData & {
    channel: ChannelType;
};

export const DefaultOption = (props: Props) => {
    const { ingress, channel, title, url, icon } = props;
    const { language } = usePageConfig();
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

    return (
        <div className={style.contactOption}>
            <LenkeBase
                {...getUrlOrClickHandler(channel)}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
                className={style.link}
            >
                <div className={style.linkContent}>
                    <div
                        className={classNames(
                            style.icon,
                            style[icon || channel]
                        )}
                    />
                    <Heading level="3" size="small">
                        {/* title is always defined for custom channel */}
                        {title || getTranslations(channel as NotCustom).title}
                    </Heading>
                </div>
            </LenkeBase>
            <BodyLong as="div" className={style.text}>
                {/* ingress is always defined for custom channel */}
                {ingress ? (
                    <ParsedHtml htmlProps={ingress} />
                ) : (
                    getTranslations(channel as NotCustom).ingress
                )}
            </BodyLong>
        </div>
    );
};

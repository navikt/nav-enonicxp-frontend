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
import { analyticsEvents } from 'utils/amplitude';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';

import style from './ContactOption.module.scss';

interface DefaultContactProps extends DefaultContactData {
    channel: ChannelType;
}

export const DefaultOption = (props: DefaultContactProps) => {
    const { ingress, channel, title, url, icon } = props;
    const { language } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();
    const getTranslations = translator('contactPoint', language);

    const getTitle = () => {
        if (channel === 'custom' || title) {
            return title;
        }

        const translations = getTranslations(channel);

        if (translations && translations.title) {
            return translations.title;
        }

        return '';
    };

    const getIngress = () => {
        if (channel === 'custom' || ingress) {
            return ingress;
        }

        const translations = getTranslations(channel);
        return ingress || (translations && translations.ingress);
    };

    // In order to open chatbot, onClick is needed instead of href. Therefore
    // return an object which is destructed into Lenkebase with the proper props (href | onClick)
    const getUrlOrClickHandler = (channel: ChannelType) => {
        if (channel === 'write') {
            return {
                href: url || '/person/kontakt-oss/nb/skriv-til-oss',
            };
        }

        if (channel === 'call') {
            return {
                href: 'tel:+4755553333',
                event: analyticsEvents.CALL,
            };
        }

        if (channel === 'chat') {
            return {
                href: '#',
                onClick: (e) => {
                    e.preventDefault();
                    openChatbot();
                },
                event: analyticsEvents.CHAT_OPEN,
            };
        }
        if (channel === 'navoffice') {
            return {
                href: 'https://www.nav.no/sok-nav-kontor',
                target: '_blank',
            };
        }
        if (channel === 'aidcentral') {
            return {
                href: 'https://www.nav.no/no/person/hjelpemidler/hjelpemidler-og-tilrettelegging/kontakt-nav-hjelpemiddelsentral',
                target: '_blank',
            };
        }
        if (channel === 'custom') {
            return {
                href: url,
                target: '_blank',
                event: analyticsEvents.NAVIGATION,
            };
        }

        return { href: '#' };
    };

    const getIconName = () => {
        if (channel === 'custom') {
            return icon;
        }

        return channel;
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
                        className={classNames(style.icon, style[getIconName()])}
                    />
                    <Heading level="3" size="small">
                        {getTitle()}
                    </Heading>
                </div>
            </LenkeBase>
            <BodyLong className={style.text}>
                <div dangerouslySetInnerHTML={{ __html: getIngress() }} />
            </BodyLong>
        </div>
    );
};

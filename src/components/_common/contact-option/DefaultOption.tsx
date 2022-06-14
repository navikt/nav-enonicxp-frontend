import {
    ChannelType,
    DefaultContactData,
} from '../../../types/component-props/parts/contact-option';

import { translator } from 'translations';
import { Heading, BodyLong } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { openChatbot } from '../../../utils/chatbot';

import { classNames } from 'utils/classnames';

import style from './ContactOption.module.scss';

interface DefaultContactProps extends DefaultContactData {
    channel: ChannelType;
}

export const DefaultOption = (props: DefaultContactProps) => {
    const { ingress, channel, title, url, icon } = props;
    const { language } = usePageConfig();

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
            };
        }

        if (channel === 'chat') {
            return {
                href: '#',
                onClick: openChatbot,
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
                className={style.link}
            >
                <div className={style.linkContent}>
                    <div
                        className={classNames(style.icon, style[getIconName()])}
                    />
                    <Heading level="2" size="medium">
                        {getTitle()}
                    </Heading>
                </div>
            </LenkeBase>
            <BodyLong className={style.text}>{getIngress()}</BodyLong>
        </div>
    );
};

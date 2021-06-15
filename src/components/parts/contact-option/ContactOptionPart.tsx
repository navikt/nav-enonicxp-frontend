import Tekstomrade from 'nav-frontend-tekstomrade';
import { Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import { BEM, classNames } from 'utils/classnames';

import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { translator } from 'translations';

import {
    ChannelData,
    ContactOption,
    ContactOptionProps,
} from '../../../types/component-props/parts/contact-option';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';

import './ContactOptionPart.less';

const bem = BEM('contactOption');

export const ContactOptionPart = ({ config }: ContactOptionProps) => {
    const { language } = usePageConfig();
    const getTranslations = translator('contactPoint', language);

    if (!config?.contactOptions?._selected) {
        return <div>Velg kanal fra listen til høyre.</div>;
    }

    const { contactOptions } = config;
    const selectedChannel = contactOptions._selected;
    const channelData = contactOptions[selectedChannel];
    const translations = getTranslations(selectedChannel);

    const openChatbot = (e: React.MouseEvent) => {
        e.preventDefault();
        const chatButton = document.getElementById('chatbot-frida-knapp');
        chatButton?.click?.();
    };

    const getTitle = (channel: ContactOption, data: ChannelData) => {
        const abroadPrefix = language !== 'no' ? '+47' : '';

        if (!translations) {
            return '';
        }

        if (channel !== ContactOption.CALL) {
            // Only CALL section is allowed to change title.
            return translations.title;
        }

        return `${translations.title} ${abroadPrefix} ${
            data.phoneNumber || '55 55 33 33'
        }`;
    };

    const getIngress = (channel: ContactOption, data: ChannelData) => {
        return data.ingress || (translations && translations.ingress);
    };

    // In order to open chatbot, onClick is needed instead of href. Therefore
    // return an object which is destructed into Lenkebase with the proper props (href | onClick)
    const getUrlOrClickHandler = (
        channel: ContactOption,
        data: ChannelData
    ) => {
        if (channel === ContactOption.CALL) {
            return {
                href: `tel:+47${data?.phoneNumber || '55553333'}`,
            };
        }

        if (channel === ContactOption.WRITE) {
            return {
                href: 'https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss',
            };
        }

        if (channel === ContactOption.CHAT) {
            return {
                onClick: openChatbot,
            };
        }

        return { href: '/' };
    };

    return (
        <div className={classNames(bem('wrapper'))}>
            <div
                className={classNames(
                    bem('icon'),
                    bem('icon', selectedChannel)
                )}
            />
            <LenkeBase
                className={classNames(bem('link'))}
                href="/"
                {...getUrlOrClickHandler(selectedChannel, channelData)}
            >
                <Undertittel tag="h3" className={classNames(bem('title'))}>
                    {getTitle(selectedChannel, channelData)}
                </Undertittel>
            </LenkeBase>
            <Tekstomrade>
                {getIngress(selectedChannel, channelData)}
            </Tekstomrade>
        </div>
    );
};

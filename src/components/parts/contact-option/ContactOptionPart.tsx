import { Title, BodyLong } from '@navikt/ds-react';
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
import { openChatbot } from '../../../utils/chatbot';
import { EditorHelp } from '../../_common/editor-help/EditorHelp';

import './ContactOptionPart.less';

const bem = BEM('contactOption');

export const ContactOptionPart = ({ config }: ContactOptionProps) => {
    const { language } = usePageConfig();
    const getTranslations = translator('contactPoint', language);

    if (!config?.contactOptions?._selected) {
        return <EditorHelp text={'Velg kanal fra listen til høyre'} />;
    }

    const { contactOptions } = config;
    const selectedChannel = contactOptions._selected;
    const channelData = contactOptions[selectedChannel];
    const translations = getTranslations(selectedChannel);

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
                href: `tel:+47${
                    data?.phoneNumber?.replace(/\s/g, '') || '55553333'
                }`,
            };
        }

        if (channel === ContactOption.WRITE) {
            return {
                href: '/person/kontakt-oss/nb/skriv-til-oss',
            };
        }

        if (channel === ContactOption.CHAT) {
            return {
                href: '#',
                onClick: openChatbot,
            };
        }

        return { href: '#' };
    };

    return (
        <LenkeBase
            className={classNames(bem())}
            {...getUrlOrClickHandler(selectedChannel, channelData)}
        >
            <div
                className={classNames(
                    bem('icon'),
                    bem('icon', selectedChannel)
                )}
            />
            <Title level={2} size="m" className={bem('title')}>
                {getTitle(selectedChannel, channelData)}
            </Title>
            <BodyLong className={bem('text')}>
                {getIngress(selectedChannel, channelData)}
            </BodyLong>
        </LenkeBase>
    );
};

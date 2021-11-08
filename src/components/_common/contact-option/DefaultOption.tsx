import {
    ContactData,
    ChannelType,
} from '../../../types/component-props/parts/contact-option';

import { translator } from 'translations';
import { Title, BodyLong } from '@navikt/ds-react';
import { usePageConfig } from 'store/hooks/usePageConfig';

import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { openChatbot } from '../../../utils/chatbot';

import { BEM, classNames } from 'utils/classnames';

import './DefaultOption.less';

const bem = BEM('contactOption');

export const ContactOption = (props: ContactData) => {
    const { title, ingress, phoneNumber, channel } = props;
    const { language } = usePageConfig();

    const getTranslations = translator('contactPoint', language);
    const translations = getTranslations(channel);

    const getTitle = (channel: ChannelType) => {
        const abroadPrefix = language !== 'no' ? '+47' : '';

        if (!translations) {
            return '';
        }

        if (channel !== ChannelType.CALL) {
            // Only CALL section is allowed to change title.
            return translations.title;
        }

        return `${translations.title} ${abroadPrefix} ${
            title || '55 55 33 33'
        }`;
    };

    const getIngress = (channel: ChannelType) => {
        return ingress || (translations && translations.ingress);
    };

    // In order to open chatbot, onClick is needed instead of href. Therefore
    // return an object which is destructed into Lenkebase with the proper props (href | onClick)
    const getUrlOrClickHandler = (channel: ChannelType) => {
        if (channel === ChannelType.CALL) {
            return {
                href: `tel:+47${phoneNumber?.replace(/\s/g, '') || '55553333'}`,
            };
        }

        if (channel === ChannelType.WRITE) {
            return {
                href: '/person/kontakt-oss/nb/skriv-til-oss',
            };
        }

        if (channel === ChannelType.CHAT) {
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
            {...getUrlOrClickHandler(channel)}
        >
            <div className={classNames(bem('icon'), bem('icon', channel))} />
            <Title level={2} size="m" className={bem('title')}>
                {getTitle(channel)}
            </Title>
            <BodyLong className={bem('text')}>{getIngress(channel)}</BodyLong>
        </LenkeBase>
    );
};

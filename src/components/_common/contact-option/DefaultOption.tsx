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

export const DefaultOption = (props: ContactData) => {
    const { ingress, channel } = props;
    const { language } = usePageConfig();

    const getTranslations = translator('contactPoint', language);
    const translations = getTranslations(channel);

    const getTitle = () => {
        if (!translations) {
            return '';
        }

        return translations.title;
    };

    const getIngress = () => {
        return ingress || (translations && translations.ingress);
    };

    // In order to open chatbot, onClick is needed instead of href. Therefore
    // return an object which is destructed into Lenkebase with the proper props (href | onClick)
    const getUrlOrClickHandler = (channel: ChannelType) => {
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
                {getTitle()}
            </Title>
            <BodyLong className={bem('text')}>{getIngress()}</BodyLong>
        </LenkeBase>
    );
};

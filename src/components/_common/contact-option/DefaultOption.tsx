import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import {
    ChannelType,
    DefaultContactData,
} from '../../../types/component-props/part-configs/contact-option';
import { translator } from 'translations';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { AnalyticsEvents } from 'utils/amplitude';
import { useLayoutConfig } from '../../layouts/useLayoutConfig';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { ParsedHtml } from '../parsed-html/ParsedHtml';
import Config from 'config';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import {
    hoverFocusIcon,
    useHoverAndFocus,
} from './opening-info/helpers/iconUtils';

import style from './ContactOption.module.scss';

type Props = DefaultContactData & {
    channel: ChannelType;
};

export const DefaultOption = (props: Props) => {
    const { ingress, channel, title, url, icon } = props;
    const { language } = usePageConfig();
    const { layoutConfig } = useLayoutConfig();
    const { isActive, handlers } = useHoverAndFocus();
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

    const titleActual =
        title || (channel !== 'custom' ? getTranslations(channel).title : null);

    const ingressActual =
        ingress ||
        (channel !== 'custom' ? getTranslations(channel).ingress : null);

    const iconName = icon || 'place';
    const iconElement = hoverFocusIcon({
        iconDefault: `${iconName}.svg`,
        iconActive: `${iconName}-filled.svg`,
        isActive: isActive,
        style: style.icon,
    });

    return (
        <div className={style.contactOption}>
            <LenkeBase
                {...getUrlOrClickHandler(channel)}
                analyticsLinkGroup={layoutConfig.title}
                analyticsComponent={'Kontakt-oss kanal'}
                className={style.link}
                {...handlers}
            >
                <div className={style.linkContent}>
                    {iconElement}
                    {titleActual ? (
                        <Heading level={'3'} size={'small'}>
                            {titleActual}
                        </Heading>
                    ) : (
                        <EditorHelp text={'Tittel mangler!'} type={'error'} />
                    )}
                </div>
            </LenkeBase>
            {ingressActual ? (
                <BodyLong as="div" className={style.text}>
                    <ParsedHtml htmlProps={ingressActual} />
                </BodyLong>
            ) : (
                <EditorHelp text={'Ingress mangler!'} type={'error'} />
            )}
        </div>
    );
};

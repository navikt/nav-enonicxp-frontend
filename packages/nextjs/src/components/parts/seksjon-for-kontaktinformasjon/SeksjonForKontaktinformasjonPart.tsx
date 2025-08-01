import React from 'react';
import { Heading } from '@navikt/ds-react';
import { EditorHelp } from 'components/_editor-only/editorHelp/EditorHelp';
import { LenkepanelNavno } from 'components/_common/lenkepanel/LenkepanelNavno/LenkepanelNavno';
import { ContentType } from 'types/content-props/_content-common';
import { ChatbotLenkepanel } from 'components/_common/chatbot/ChatbotLenkepanel';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { ContactInformationProps } from 'types/content-props/contact-information-props';
import { SeksjonForKontaktinformasjonAlert } from './SeksjonForKontaktinformasjonAlert';

import style from './SeksjonForKontaktinformasjonPart.module.scss';

type InternalContactUs = {
    type: ContentType.GenericPage;
    _path: string;
};

type ExternalContactUs = {
    type: ContentType.ExternalLink;
    data: {
        url: string;
    };
};

export type PartConfigSeksjonForKontaktinformasjon = {
    title: string;
    chatTitle: string;
    chatAlertText?: string;
    sharedContactInformation: ContactInformationProps[];
    chatIngress: string;
    contactUsTitle: string;
    contactUsAlertText?: string;
    contactUsIngress: string;
    contactUsLink: InternalContactUs | ExternalContactUs;
};

export const SeksjonForKontaktinformasjonPart = ({
    config,
}: PartComponentProps<PartType.SeksjonForKontaktinformasjon>) => {
    if (!config) {
        return <EditorHelp text={'Komponenten er ikke konfigerert'} />;
    }

    const {
        title,
        contactUsTitle,
        contactUsAlertText,
        contactUsIngress,
        contactUsLink,
        sharedContactInformation,
    } = config;

    const contactUsUrl =
        contactUsLink &&
        (contactUsLink.type === ContentType.ExternalLink
            ? contactUsLink.data.url
            : contactUsLink._path);

    const getChatIngress = () => {
        const sharedContact = sharedContactInformation[0]?.data?.contactType?.chat;
        const specialOpeningHours = sharedContact?.specialOpeningHours;

        const chatTitle = config.chatTitle || sharedContact?.title || '';
        const chatHtml =
            config.chatIngress || specialOpeningHours?.overrideText || sharedContact?.ingress || '';

        const chatAlertText = config.chatAlertText || sharedContact?.alertText || '';

        return { chatTitle, chatHtml, chatAlertText };
    };

    const { chatTitle, chatHtml, chatAlertText } = getChatIngress();

    return (
        <section className={style.container}>
            <Heading size={'large'} level={'2'} className={style.header}>
                {title}
            </Heading>
            <div className={style.links}>
                <ChatbotLenkepanel
                    analyticsGroup={title}
                    linkText={chatTitle}
                    alertText={chatAlertText}
                    ingress={chatHtml}
                />
                <LenkepanelNavno
                    href={contactUsUrl}
                    analyticsLinkGroup={title}
                    linkText={contactUsTitle}
                >
                    {contactUsAlertText && (
                        <SeksjonForKontaktinformasjonAlert alertText={contactUsAlertText} yellow />
                    )}
                    {contactUsIngress}
                </LenkepanelNavno>
            </div>
        </section>
    );
};

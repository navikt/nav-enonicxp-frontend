import React from 'react';
import { Heading } from '@navikt/ds-react';
import { FrontpageContanctPartProps } from 'types/component-props/parts/frontpage-contact';
import { EditorHelp } from 'components/_editor-only/editor-help/EditorHelp';
import { LinkPanelNavno } from 'components/_common/linkpanel/LinkPanelNavno';
import { ContentType } from 'types/content-props/_content-common';
import { ChatbotLinkPanel } from 'components/_common/chatbot/ChatbotLinkPanel';
import { FrontpageContactAlert } from './FrontpageContactAlert';

import style from './FrontpageContactPart.module.scss';

export const FrontpageContactPart = ({ config }: FrontpageContanctPartProps) => {
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
        const chatIngress =
            config.chatIngress ||
            specialOpeningHours?.overrideText ||
            sharedContact?.ingress?.processedHtml ||
            '';

        const chatAlertText = config.chatAlertText || sharedContact?.alertText || '';

        return { chatTitle, chatIngress, chatAlertText };
    };

    const { chatTitle, chatIngress, chatAlertText } = getChatIngress();

    return (
        <div className={style.container}>
            <Heading size={'large'} level={'2'} className={style.header}>
                {title}
            </Heading>
            <div className={style.links}>
                <ChatbotLinkPanel
                    analyticsGroup={title}
                    linkText={chatTitle}
                    alertText={chatAlertText}
                    ingress={chatIngress}
                />
                <LinkPanelNavno
                    href={contactUsUrl}
                    analyticsLinkGroup={title}
                    linkText={contactUsTitle}
                >
                    {contactUsAlertText && (
                        <FrontpageContactAlert alertText={contactUsAlertText} yellow />
                    )}
                    {contactUsIngress}
                </LinkPanelNavno>
            </div>
        </div>
    );
};

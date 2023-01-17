import React from 'react';
import { FrontpageContanctPartProps } from '../../../types/component-props/parts/frontpage-contact';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LinkPanelNavno } from '../../_common/linkpanel/LinkPanelNavno';
import { Heading } from '@navikt/ds-react';
import { ContentType } from '../../../types/content-props/_content-common';
import { ChatbotLinkPanel } from '../../_common/chatbot/ChatbotLinkPanel';
import { FrontpageContactAlert } from './FrontPageContactAlert/FrontPageContactAlert';

import style from './FrontpageContactPart.module.scss';

export const FrontpageContactPart = ({
    config,
}: FrontpageContanctPartProps) => {
    if (!config) {
        return <EditorHelp text={'Komponenten er ikke konfigerert'} />;
    }

    const {
        title,
        chatTitle,
        chatAlertText,
        chatIngress,
        contactUsTitle,
        contactUsAlertText,
        contactUsIngress,
        contactUsLink,
    } = config;

    const contactUsUrl =
        contactUsLink &&
        (contactUsLink.__typename === ContentType.ExternalLink
            ? contactUsLink.data.url
            : contactUsLink._path);

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
                        <FrontpageContactAlert
                            alertText={contactUsAlertText}
                            yellow
                        />
                    )}
                    {contactUsIngress}
                </LinkPanelNavno>
            </div>
        </div>
    );
};

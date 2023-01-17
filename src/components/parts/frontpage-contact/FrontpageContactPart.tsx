import React from 'react';
import { FrontpageContanctPartProps } from '../../../types/component-props/parts/frontpage-contact';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LinkPanelNavno } from '../../_common/linkpanel/LinkPanelNavno';
import { BodyLong, Heading } from '@navikt/ds-react';
import { ContentType } from '../../../types/content-props/_content-common';
import { ChatbotLinkPanel } from '../../_common/chatbot/ChatbotLinkPanel';

import style from './FrontpageContactPart.module.scss';
import { Warning } from '@navikt/ds-icons';

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
                        <div className={style.alert}>
                            <Warning
                                title="Advarsel"
                                className={style.alertIcon}
                            />
                            <BodyLong as="div">{contactUsAlertText}</BodyLong>
                        </div>
                    )}
                    {contactUsIngress}
                </LinkPanelNavno>
            </div>
        </div>
    );
};

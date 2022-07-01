import React from 'react';
import { FrontpageContanctPartProps } from '../../../types/component-props/parts/frontpage-contact';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LinkPanelNavno } from '../../_common/linkpanel/LinkPanelNavno';
import { Heading } from '@navikt/ds-react';
import { ContentType } from '../../../types/content-props/_content-common';
import { ChatbotLinkPanel } from '../../_common/chatbot/ChatbotLinkPanel';

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
        chatIngress,
        contactUsTitle,
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
                    ingress={chatIngress}
                />
                <LinkPanelNavno
                    href={contactUsUrl}
                    linkGroup={title}
                    linkText={contactUsTitle}
                >
                    {contactUsIngress}
                </LinkPanelNavno>
            </div>
        </div>
    );
};

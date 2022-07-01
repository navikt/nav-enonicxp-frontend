import React from 'react';
import { FrontpageContanctPartProps } from '../../../types/component-props/parts/frontpage-contact';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { openChatbot } from '../../../utils/chatbot';
import { LinkPanelNavno } from '../../_common/linkpanel/LinkPanelNavno';
import { Heading } from '@navikt/ds-react';
import { ContentType } from '../../../types/content-props/_content-common';

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
        contactUsLink.__typename === ContentType.ExternalLink
            ? contactUsLink.data.url
            : contactUsLink._path;

    return (
        <div className={style.container}>
            <Heading size={'large'} level={'2'} className={style.header}>
                {title}
            </Heading>
            <div className={style.links}>
                <LinkPanelNavno
                    className={style.chat}
                    href={'#'}
                    linkGroup={title}
                    linkText={chatTitle}
                    onClick={(e) => openChatbot(e)}
                >
                    {chatIngress}
                </LinkPanelNavno>
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

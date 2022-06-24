import React from 'react';
import { FrontpageContanctPartProps } from '../../../types/component-props/parts/frontpage-contact';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { LenkeBase } from '../../_common/lenke/LenkeBase';
import { openChatbot } from '../../../utils/chatbot';

import style from './FrontpageContactUs.module.scss';
import { LinkPanelNew } from '../../_common/linkpanel/LinkPanelNew';

export const FrontpageContactPart = ({
    config,
}: FrontpageContanctPartProps) => {
    if (!config) {
        return <EditorHelp text={'Komponenten er ikke konfigerert'} />;
    }

    const {
        chatTitle,
        chatIngress,
        contactUsTitle,
        contactUsIngress,
        contactUsLink,
    } = config;

    return (
        <div className={style.container}>
            <LinkPanelNew
                className={style.chat}
                href={''}
                linkText={chatTitle}
                onClick={(e) => openChatbot(e)}
                contentProps={{ className: style.ingress }}
            >
                {chatIngress}
            </LinkPanelNew>
            <LinkPanelNew
                className={style.contactUs}
                href={contactUsLink?._path}
                linkText={contactUsTitle}
                contentProps={{ className: style.ingress }}
            >
                {contactUsIngress}
            </LinkPanelNew>
        </div>
    );
};

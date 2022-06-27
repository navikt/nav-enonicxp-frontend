import React from 'react';
import { FrontpageContanctPartProps } from '../../../types/component-props/parts/frontpage-contact';
import { EditorHelp } from '../../_editor-only/editor-help/EditorHelp';
import { openChatbot } from '../../../utils/chatbot';
import { LinkPanelNavno } from '../../_common/linkpanel/LinkPanelNavno';

import style from './FrontpageContactPart.module.scss';

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
            <LinkPanelNavno
                className={style.chat}
                href={'#'}
                linkText={chatTitle}
                onClick={(e) => openChatbot(e)}
            >
                {chatIngress}
            </LinkPanelNavno>
            <LinkPanelNavno
                href={contactUsLink?._path}
                linkText={contactUsTitle}
            >
                {contactUsIngress}
            </LinkPanelNavno>
        </div>
    );
};

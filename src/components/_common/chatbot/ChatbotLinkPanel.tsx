import React from 'react';
import { LinkPanelNavno } from '../linkpanel/LinkPanelNavno';
import { openChatbot } from '../../../utils/chatbot';

import style from './ChatbotLinkPanel.module.scss';

type Props = { analyticsGroup: string; linkText: string; ingress: string };

export const ChatbotLinkPanel = ({
    analyticsGroup,
    linkText,
    ingress,
}: Props) => {
    return (
        <LinkPanelNavno
            className={style.chat}
            href={'#'}
            linkGroup={analyticsGroup}
            linkText={linkText}
            onClick={(e) => openChatbot(e)}
        >
            {ingress}
        </LinkPanelNavno>
    );
};

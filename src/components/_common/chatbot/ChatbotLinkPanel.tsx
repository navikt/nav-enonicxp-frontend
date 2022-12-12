import React from 'react';
import { LinkPanelNavno } from '../linkpanel/LinkPanelNavno';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';

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
            analyticsLinkGroup={analyticsGroup}
            linkText={linkText}
            onClick={(e) => {
                e.preventDefault();
                openChatbot();
            }}
        >
            {ingress}
        </LinkPanelNavno>
    );
};

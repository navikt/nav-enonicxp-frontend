import React from 'react';
import { LinkPanelNavno } from '../linkpanel/LinkPanelNavno';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { Alert } from '@navikt/ds-react';

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
            <Alert variant="warning">
                Akkurat nå virker ikke chatten, vi jobber med å fikse feilen.
            </Alert>
            {ingress}
        </LinkPanelNavno>
    );
};

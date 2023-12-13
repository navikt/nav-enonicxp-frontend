import React from 'react';
import { LinkPanelNavno } from '../linkpanel/LinkPanelNavno';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { FrontpageContactAlert } from 'components/parts/frontpage-contact/FrontpageContactAlert';
import { ParsedHtml } from '../parsed-html/ParsedHtml';

import style from './ChatbotLinkPanel.module.scss';

type Props = {
    analyticsGroup: string;
    linkText: string;
    alertText?: string;
    ingress: string;
};

export const ChatbotLinkPanel = ({
    analyticsGroup,
    linkText,
    alertText,
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
            {alertText && <FrontpageContactAlert alertText={alertText} />}
            <ParsedHtml htmlProps={ingress} />
        </LinkPanelNavno>
    );
};

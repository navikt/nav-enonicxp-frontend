import React from 'react';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { LinkPanelNavno } from 'components/_common/linkpanel/LinkPanelNavno/LinkPanelNavno';
import { FrontpageContactAlert } from 'components/parts/frontpage-contact/FrontpageContactAlert';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import style from './ChatbotLinkPanel.module.scss';

type Props = {
    analyticsGroup: string;
    linkText: string;
    alertText?: string;
    ingress: string | ProcessedHtmlProps;
};

export const ChatbotLinkPanel = ({ analyticsGroup, linkText, alertText, ingress }: Props) => {
    return (
        <LinkPanelNavno
            className={style.chat}
            href={'#'}
            analyticsLinkGroup={analyticsGroup}
            linkText={linkText}
            onClickEvent={(e) => {
                e.preventDefault();
                openChatbot();
            }}
        >
            {alertText && <FrontpageContactAlert alertText={alertText} />}
            <ParsedHtml htmlProps={ingress} />
        </LinkPanelNavno>
    );
};

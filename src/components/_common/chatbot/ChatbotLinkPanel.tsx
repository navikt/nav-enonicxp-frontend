import React from 'react';
import { translator } from 'translations';
import { LinkPanelNavno } from '../linkpanel/LinkPanelNavno';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';

import style from './ChatbotLinkPanel.module.scss';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { Alert } from '@navikt/ds-react';

type Props = { analyticsGroup: string; linkText: string; ingress: string };

export const ChatbotLinkPanel = ({
    analyticsGroup,
    linkText,
    ingress,
}: Props) => {
    const { language } = usePageConfig();
    const getTranslations = translator('contactPoint', language);
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
            <Alert variant="warning" inline className={style.alert}>
                {getTranslations('chat').downAlert}
            </Alert>
            {ingress}
        </LinkPanelNavno>
    );
};

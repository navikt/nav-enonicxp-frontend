import React from 'react';
import { LinkPanelNavno } from '../linkpanel/LinkPanelNavno';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { Warning } from '@navikt/ds-icons';
import { BodyLong } from '@navikt/ds-react';

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
            {alertText && (
                <div className={style.alert}>
                    <Warning title="Advarsel" className={style.alertIcon} />
                    <BodyLong as="div">{alertText}</BodyLong>
                </div>
            )}
            {ingress}
        </LinkPanelNavno>
    );
};

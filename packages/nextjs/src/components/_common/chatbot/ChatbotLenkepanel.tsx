import React from 'react';
import { openChatbot } from '@navikt/nav-dekoratoren-moduler';
import { LenkepanelNavno } from 'components/_common/lenkepanel/LenkepanelNavno/LenkepanelNavno';
import { SeksjonForKontaktinformasjonAlert } from 'components/parts/seksjon-for-kontaktinformasjon/SeksjonForKontaktinformasjonAlert';
import { ParsedHtml } from 'components/_common/parsedHtml/ParsedHtml';
import { ProcessedHtmlProps } from 'types/processed-html-props';
import style from './ChatbotLenkepanel.module.scss';

type Props = {
    analyticsGroup: string;
    linkText: string;
    alertText?: string;
    ingress: string | ProcessedHtmlProps;
};

export const ChatbotLenkepanel = ({ analyticsGroup, linkText, alertText, ingress }: Props) => {
    return (
        <LenkepanelNavno
            className={style.chat}
            href={'#'}
            analyticsLinkGroup={analyticsGroup}
            linkText={linkText}
            onClickEvent={(e) => {
                e.preventDefault();
                openChatbot();
            }}
        >
            {alertText && <SeksjonForKontaktinformasjonAlert alertText={alertText} />}
            <ParsedHtml htmlProps={ingress} />
        </LenkepanelNavno>
    );
};

// @ts-nocheck
// Refactor the macro types before fixing the type errors in this file
import React from 'react';
import { logger } from '@/shared/logger';
import { MacroPropsCommon, MacroType } from 'types/macro-props/_macros-common';
import { MacroProductCardMicro } from 'components/macros/product-card-micro/MacroProductCardMicro';
import { MacroTall } from 'components/macros/tall/MacroTall';
import { MacroUxSignalsWidget } from 'components/macros/uxsignals-widget/MacroUxSignalsWidget';
import { MacroLinkToLayer } from 'components/macros/link-to-layer/MacroLinkToLayer';
import { MacroButton } from './button/MacroButton';
import { MacroChevronLinkExternal } from './chevron-link-external/MacroChevronLinkExternal';
import { MacroChevronLinkInternal } from './chevron-link-internal/MacroChevronLinkInternal';
import { MacroChatbotLink } from './chatbot-link/MacroChatbotLink';
import { MacroFotnote } from './fotnote/MacroFotnote';
import { MacroSkjemadetaljer } from './skjemadetaljer/MacroSkjemadetaljer';
import { MacroInfoBoks } from './infoboks/MacroInfoBoks';
import { MacroLenkeFiler } from './lenke-filer/MacroLenkeFiler';
import { MacroPhoneLink } from './phone-link/MacroPhoneLink';
import { MacroQuote } from './quote/MacroQuote';
import { MacroTankestrek } from './tankestrek/MacroTankestrek';
import { MacroVarselBoksDeprecated } from './varsel-boks-deprecated/MacroVarselBoksDeprecated';
import { MacroVideo } from './video/MacroVideo';
import { MacroHtmlFragment } from './html-fragment/MacroHtmlFragment';
import { MacroHeaderWithAnchor } from './header-with-anchor/MacroHeaderWithAnchor';
import { MacroGlobalValue } from './global-value/MacroGlobalValue';
import { MacroGlobalValueWithMath } from './global-value-with-math/MacroGlobalValueWithMath';
import { MacroProductCardMini } from './product-card-mini/MacroProductCardMini';
import { MacroIngress } from './ingress/MacroIngress';
import { MacroVarselboks } from './varselboks/MacroVarselboks';
import { MacroSaksbehandlingstid } from './saksbehandlingstid/MacroSaksbehandlingstid';
import { MacroPayoutDates } from './payout-dates/MacroPayoutDates';
import { MacroConsentBannerLink } from './consent-banner-link/MacroConsentBannerLink';

const macroComponents: {
    [key in MacroType]: React.FunctionComponent<MacroPropsCommon>;
} = {
    [MacroType.Varselboks]: MacroVarselboks,
    [MacroType.Button]: MacroButton,
    [MacroType.ButtonBlue]: MacroButton,
    [MacroType.Saksbehandlingstid]: MacroSaksbehandlingstid,
    [MacroType.ChatbotLink]: MacroChatbotLink,
    [MacroType.ConsentBannerLink]: MacroConsentBannerLink,
    [MacroType.ChevronLinkExternal]: MacroChevronLinkExternal,
    [MacroType.ChevronLinkInternal]: MacroChevronLinkInternal,
    [MacroType.Fotnote]: MacroFotnote,
    [MacroType.FormDetails]: MacroSkjemadetaljer,
    [MacroType.GlobalValue]: MacroGlobalValue,
    [MacroType.GlobalValueWithMath]: MacroGlobalValueWithMath,
    [MacroType.HeaderWithAnchor]: MacroHeaderWithAnchor,
    [MacroType.HtmlFragment]: MacroHtmlFragment,
    [MacroType.InfoBoks]: MacroInfoBoks,
    [MacroType.Ingress]: MacroIngress,
    [MacroType.LenkeFiler]: MacroLenkeFiler,
    [MacroType.LinkToLayer]: MacroLinkToLayer,
    [MacroType.PayoutDates]: MacroPayoutDates,
    [MacroType.PhoneLink]: MacroPhoneLink,
    [MacroType.ProductCardMicro]: MacroProductCardMicro,
    [MacroType.ProductCardMini]: MacroProductCardMini,
    [MacroType.Quote]: MacroQuote,
    [MacroType.Tall]: MacroTall,
    [MacroType.Tankestrek]: MacroTankestrek,
    [MacroType.UxSignalsWidget]: MacroUxSignalsWidget,
    [MacroType.VarselBoksDeprecated]: MacroVarselBoksDeprecated,
    [MacroType.Video]: MacroVideo,
};

type Props = {
    macros: MacroPropsCommon[];
    macroRef: string;
};

export const MacroMapper = ({ macros, macroRef }: Props) => {
    if (!macroRef) {
        return null;
    }

    const macroProps = macros?.find((macro) => macro.ref === macroRef);

    if (!macroProps) {
        logger.info(`Invalid macro ref: ${macroRef}`);
        return <>{`Error: macro with ref ${macroRef} not found!`}</>;
    }

    const { name } = macroProps;

    const MacroComponent = macroComponents[name];
    if (MacroComponent) {
        return <MacroComponent {...macroProps} ref={undefined} />;
    }

    return <>{`Unimplemented macro: ${name}`}</>;
};

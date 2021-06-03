import React from 'react';
import {
    MacroPropsCommon,
    MacroType,
} from '../../types/macro-props/_macros-common';
import { MacroButton } from './button/MacroButton';
import { MacroButtonBlue } from './button-blue/MacroButtonBlue';
import { MacroChevronLinkExternal } from './chevron-link-external/MacroChevronLinkExternal';
import { MacroChevronLinkInternal } from './chevron-link-internal/MacroChevronLinkInternal';
import { MacroChatbotLink } from './chatbot-link/MacroChatbotLink';
import { MacroFotnote } from './fotnote/MacroFotnote';
import { MacroInfoBoks } from './infoboks/MacroInfoBoks';
import { MacroLenkeFiler } from './lenke-filer/MacroLenkeFiler';
import { MacroPhoneLink } from './phone-link/MacroPhoneLink';
import { MacroQuote } from './quote/MacroQuote';
import { MacroTankestrek } from './tankestrek/MacroTankestrek';
import { MacroVarselBoks } from './varselboks/MacroVarselBoks';
import { MacroVideo } from './Video/MacroVideo';
import { MacroHtmlFragment } from './html-fragment/MacroHtmlFragment';

const macroComponents: {
    [key in MacroType]: React.FunctionComponent<MacroPropsCommon>;
} = {
    [MacroType.Button]: MacroButton,
    [MacroType.ButtonBlue]: MacroButtonBlue,
    [MacroType.ChatbotLink]: MacroChatbotLink,
    [MacroType.ChevronLinkExternal]: MacroChevronLinkExternal,
    [MacroType.ChevronLinkInternal]: MacroChevronLinkInternal,
    [MacroType.Fotnote]: MacroFotnote,
    [MacroType.HtmlFragment]: MacroHtmlFragment,
    [MacroType.InfoBoks]: MacroInfoBoks,
    [MacroType.LenkeFiler]: MacroLenkeFiler,
    [MacroType.PhoneLink]: MacroPhoneLink,
    [MacroType.Quote]: MacroQuote,
    [MacroType.Tankestrek]: MacroTankestrek,
    [MacroType.VarselBoks]: MacroVarselBoks,
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
        console.log(`Invalid macro ref: ${macroRef}`);
        return <>{`Error: macro with ref ${macroRef} not found!`}</>;
    }

    const { name } = macroProps;

    const MacroComponent = macroComponents[name];
    if (MacroComponent) {
        return <MacroComponent {...macroProps} ref={undefined} />;
    }

    return <>{`Unimplemented macro: ${name}`}</>;
};

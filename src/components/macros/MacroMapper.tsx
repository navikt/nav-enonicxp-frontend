import React from 'react';
import {
    MacroPropsCommon,
    MacroType,
} from '../../types/macro-props/_macros-common';

const macroComponents: {
    [key in MacroType]: React.FunctionComponent<MacroPropsCommon>;
} = {
    [MacroType.Button]: MacroButton,
    [MacroType.ButtonBlue]: MacroButtonBlue,
    [MacroType.ChatbotLink]: MacroChatbotLink,
    [MacroType.ChevronLinkExternal]: MacroChevronLinkExternal,
    [MacroType.ChevronLinkInternal]: MacroChevronLinkInternal,
    [MacroType.Fotnote]: MacroFotnote,
    [MacroType.InfoBoks]: MacroInfoBoks,
    [MacroType.LenkeFiler]: MacroLenkeFiler,
    [MacroType.PhoneLink]: MacroPhoneLink,
    [MacroType.Quote]: MacroQuote,
    [MacroType.Tankestrek]: MacroTankestrek,
    [MacroType.VarselBoks]: MacroVarselBoks,
    [MacroType.Video]: MacroVideo,
};

export const MacroMapper = (props: MacroPropsCommon) => {
    const { descriptor, ref } = props;

    const MacroComponent = macroComponents[name];
    if (MacroComponent) {
        return <MacroComponent {...props} />;
    }

    return <>{`Unimplemented macro: ${name}`}</>;
};

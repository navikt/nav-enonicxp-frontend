import React from 'react';
import {
    MacroPropsCommon,
    MacroName,
} from '../../types/macro-props/_macros-common';

const macroComponents: {
    [key in MacroName]: React.FunctionComponent<MacroPropsCommon>;
} = {
    [MacroName.Button]: MacroButton,
    [MacroName.ButtonBlue]: MacroButtonBlue,
    [MacroName.ChatbotLink]: MacroChatbotLink,
    [MacroName.ChevronLinkExternal]: MacroChevronLinkExternal,
    [MacroName.ChevronLinkInternal]: MacroChevronLinkInternal,
    [MacroName.Fotnote]: MacroFotnote,
    [MacroName.Infoboks]: MacroInfoBoks,
    [MacroName.LenkeFiler]: MacroLenkeFiler,
    [MacroName.PhoneLink]: MacroPhoneLink,
    [MacroName.Quote]: MacroQuote,
    [MacroName.Tankestrek]: MacroTankestrek,
    [MacroName.VarselBoks]: MacroVarselBoks,
    [MacroName.Video]: MacroVideo,
};

export const MacroMapper = (props: MacroPropsCommon) => {
    const { descriptor, ref } = props;

    const MacroComponent = macroComponents[name];
    if (MacroComponent) {
        return <MacroComponent {...props} />;
    }

    return <>{`Unimplemented macro: ${name}`}</>;
};

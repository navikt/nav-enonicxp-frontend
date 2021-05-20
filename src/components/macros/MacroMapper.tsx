import React from 'react';
import {
    MacroPropsCommon,
    MacroType,
} from '../../types/macro-props/_macros-common';

const macroComponents: {
    [key in MacroType]: React.FunctionComponent<MacroPropsCommon>;
} = {
    [MacroType.Button]: () => null,
    [MacroType.ButtonBlue]: () => null,
    [MacroType.ChevronLinkExternal]: () => null,
    [MacroType.ChevronLinkInternal]: () => null,
    [MacroType.Fotnote]: () => null,
    [MacroType.Infoboks]: () => null,
    [MacroType.LenkeFiler]: () => null,
    [MacroType.PhoneLink]: () => null,
    [MacroType.Quote]: () => null,
    [MacroType.Tankestrek]: () => null,
    [MacroType.VarselBoks]: () => null,
    [MacroType.Video]: () => null,
};

export const MacroMapper = (props: MacroPropsCommon) => {
    const { descriptor, ref } = props;

    const MacroComponent = macroComponents[descriptor];
    if (MacroComponent) {
        return <MacroComponent {...props} />;
    }

    return <>{`Unimplemented macro: ${descriptor}`}</>;
};

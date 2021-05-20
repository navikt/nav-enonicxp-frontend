import { MacroPropsCommon, MacroType } from './_macros-common';

interface PhoneLinkMacroProps extends MacroPropsCommon {
    descriptor: MacroType.PhoneLink;
    config: {
        text: string;
        phoneNumber: string;
        chevron: boolean;
    };
}

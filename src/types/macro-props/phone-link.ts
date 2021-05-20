import { MacroPropsCommon, MacroType } from './_macros-common';

export interface PhoneLinkMacroProps extends MacroPropsCommon {
    name: MacroType.PhoneLink;
    config: {
        phone_link: {
            text: string;
            phoneNumber: string;
            chevron: boolean;
        };
    };
}

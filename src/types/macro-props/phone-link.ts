import { MacroPropsCommon, MacroName } from './_macros-common';

export interface PhoneLinkMacroProps extends MacroPropsCommon {
    name: MacroName.PhoneLink;
    config: {
        phone_link: {
            text: string;
            phoneNumber: string;
            chevron: boolean;
        };
    };
}

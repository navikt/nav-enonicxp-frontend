import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroPhoneLinkProps extends MacroPropsCommon {
    name: MacroType.PhoneLink;
    config: {
        phone_link: {
            text: string;
            phoneNumber: string;
            chevron: boolean;
        };
    };
}

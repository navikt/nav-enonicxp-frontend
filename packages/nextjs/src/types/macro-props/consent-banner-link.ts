import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroConsentBannerLinkProps extends MacroPropsCommon {
    name: MacroType.ChevronLinkExternal;
    config: {
        consent_banner_link: {
            text: string;
            presentation: 'button' | 'link';
        };
    };
}

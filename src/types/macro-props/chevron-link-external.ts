import { MacroPropsCommon, MacroType } from './_macros-common';
import { ExternalLinkMixin } from '../component-props/_mixins';

export interface ChevronLinkExternalMacroProps extends MacroPropsCommon {
    descriptor: MacroType.ChevronLinkExternal;
    config: {
        chevron_link_external: ExternalLinkMixin;
    };
}

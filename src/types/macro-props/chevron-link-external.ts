import { MacroPropsCommon, MacroName } from './_macros-common';
import { ExternalLinkMixin } from '../component-props/_mixins';

export interface ChevronLinkExternalMacroProps extends MacroPropsCommon {
    name: MacroName.ChevronLinkExternal;
    config: {
        chevron_link_external: ExternalLinkMixin;
    };
}

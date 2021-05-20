import { MacroPropsCommon, MacroName } from './_macros-common';
import { InternalLinkMixin } from '../component-props/_mixins';

export interface ChevronLinkInternalMacroProps extends MacroPropsCommon {
    name: MacroName.ChevronLinkInternal;
    config: {
        chevron_link_internal: InternalLinkMixin;
    };
}

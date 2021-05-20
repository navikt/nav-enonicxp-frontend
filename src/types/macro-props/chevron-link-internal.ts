import { MacroPropsCommon, MacroType } from './_macros-common';
import { InternalLinkMixin } from '../component-props/_mixins';

export interface ChevronLinkInternalMacroProps extends MacroPropsCommon {
    name: MacroType.ChevronLinkInternal;
    config: {
        chevron_link_internal: InternalLinkMixin;
    };
}

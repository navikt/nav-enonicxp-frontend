import { InternalLinkMixin } from 'types/component-props/_mixins';
import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroChevronLinkInternalProps extends MacroPropsCommon {
    name: MacroType.ChevronLinkInternal;
    config: {
        chevron_link_internal: InternalLinkMixin;
    };
}

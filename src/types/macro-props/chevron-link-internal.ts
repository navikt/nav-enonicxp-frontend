import { MacroPropsCommon, MacroType } from './_macros-common';
import { InternalLinkMixin } from 'types/component-props/_mixins';

export interface MacroChevronLinkInternalProps extends MacroPropsCommon {
    name: MacroType.ChevronLinkInternal;
    config: {
        chevron_link_internal: InternalLinkMixin;
    };
}

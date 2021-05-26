import { MacroPropsCommon, MacroType } from './_macros-common';
import { ExternalLinkMixin } from '../component-props/_mixins';

export interface MacroChevronLinkExternalProps extends MacroPropsCommon {
    name: MacroType.ChevronLinkExternal;
    config: {
        chevron_link_external: ExternalLinkMixin;
    };
}

import { ExternalLinkMixin } from 'types/component-props/_mixins';
import { MacroPropsCommon, MacroType } from './_macros-common';

export interface MacroChevronLinkExternalProps extends MacroPropsCommon {
    name: MacroType.ChevronLinkExternal;
    config: {
        chevron_link_external: ExternalLinkMixin;
    };
}

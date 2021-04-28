import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { LinkWithIngressMixin } from '../_mixins';
import { XpImageProps } from '../../media';

type Variant = 'vertical' | 'verticalWithTopBg';

type VariantConfigs = {
    vertical: {};
    verticalWithTopBg: {};
};

interface LinkPanelConfig extends LinkWithIngressMixin {
    vertical: boolean;
    background: XpImageProps;
    icon: XpImageProps;
    variants: {
        _selected: Variant;
    } & VariantConfigs;
}

export interface LinkPanelPartProps extends PartComponentProps {
    descriptor: PartType.LinkPanel;
    config: Partial<LinkPanelConfig>;
}

import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    ColorMixin,
    LinkWithIngressMixin,
    RenderOnAuthStateMixin,
} from '../_mixins';
import { XpImageProps } from '../../media';

type Variant = 'vertical' | 'verticalWithBgColor';

type VariantConfigs = {
    verticalWithBgColor: {
        iconBg: ColorMixin;
        iconJustify: 'flex-start' | 'center' | 'flex-end';
    };
};

interface LinkPanelConfig extends LinkWithIngressMixin, RenderOnAuthStateMixin {
    background: XpImageProps;
    icon: XpImageProps;
    variant: {
        _selected: Variant;
    } & VariantConfigs;
}

export interface LinkPanelPartProps extends PartComponentProps {
    descriptor: PartType.LinkPanel;
    config: Partial<LinkPanelConfig>;
}

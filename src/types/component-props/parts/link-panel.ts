import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    ColorMixin,
    LinkWithIngressMixin,
    RenderOnAuthStateMixin,
} from '../_mixins';
import { XpImageProps } from '../../media';

type Variant = 'vertical' | 'verticalWithBgColor';

type LinkPanelConfig = {
    background: XpImageProps;
    icon: XpImageProps;
    variant: {
        _selected: Variant;
        verticalWithBgColor: {
            iconBg: ColorMixin;
            iconJustify: 'flex-start' | 'center' | 'flex-end';
        };
    };
} & LinkWithIngressMixin &
    RenderOnAuthStateMixin;

export interface LinkPanelPartProps extends PartComponentProps {
    descriptor: PartType.LinkPanel;
    config: Partial<LinkPanelConfig>;
}

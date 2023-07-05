import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    ColorMixin,
    LinkWithIngressMixin,
    RenderOnAuthStateMixin,
} from '../_mixins';
import { XpImageProps } from '../../media';
import { EmptyObject, OptionSetSingle } from '../../util-types';

type LinkPanelConfig = {
    background?: XpImageProps;
    icon?: XpImageProps;
    variant?: OptionSetSingle<{
        vertical: EmptyObject;
        verticalWithBgColor: {
            iconBg: ColorMixin;
            iconJustify: 'flex-start' | 'center' | 'flex-end';
        };
    }>;
} & LinkWithIngressMixin &
    RenderOnAuthStateMixin;

export interface LinkPanelPartProps extends PartComponentProps {
    descriptor: PartType.LinkPanel;
    config: LinkPanelConfig;
}

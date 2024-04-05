import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import {
    ColorMixin,
    LinkWithIngressMixin,
    RenderOnAuthStateMixin,
} from 'types/component-props/_mixins';
import { XpImageProps } from 'types/media';
import { EmptyObject, OptionSetSingle } from 'types/util-types';

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

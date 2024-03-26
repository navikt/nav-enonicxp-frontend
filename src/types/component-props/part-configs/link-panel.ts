import { ColorMixin, LinkWithIngressMixin } from 'types/component-props/_mixins';
import { XpImageProps } from 'types/media';
import { EmptyObject, OptionSetSingle } from 'types/util-types';

export type PartConfigLinkPanel = {
    background?: XpImageProps;
    icon?: XpImageProps;
    variant?: OptionSetSingle<{
        vertical: EmptyObject;
        verticalWithBgColor: {
            iconBg: ColorMixin;
            iconJustify: 'flex-start' | 'center' | 'flex-end';
        };
    }>;
} & LinkWithIngressMixin;

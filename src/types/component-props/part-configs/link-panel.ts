import { ColorMixin, LinkWithIngressMixin } from '../_mixins';
import { XpImageProps } from '../../media';
import { EmptyObject, OptionSetSingle } from '../../util-types';

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

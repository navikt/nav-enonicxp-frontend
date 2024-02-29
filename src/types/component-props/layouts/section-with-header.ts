import { LayoutCommonProps, LayoutType, Regions } from '../layouts';
import { ComponentType } from '../_component-common';
import { HeaderWithAnchorMixin, LayoutCommonConfigMixin } from '../_mixins';
import { XpImageProps } from '../../media';
import { OptionSetSingle } from 'types/util-types';

export interface SectionWithHeaderProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.SectionWithHeader;
    regions: Regions<'intro' | 'content'>;
    config: {
        displays: OptionSetSingle<{
            alternativeAudience: {
                title: string;
                description: string;
            };
            relatedSituations: {
                title: string;
                description: string;
            };
        }>;
        icon?: {
            icon: XpImageProps;
            color?: string;
            size?: number;
        };
        border?: {
            color: string;
            rounded: boolean;
            width: number;
        };
    } & Partial<HeaderWithAnchorMixin> &
        Pick<LayoutCommonConfigMixin, 'bgColor'>;
}

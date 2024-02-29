import { LayoutCommonProps, LayoutType, Regions } from '../layouts';
import { ComponentType } from '../_component-common';
import { HeaderWithAnchorMixin, LayoutCommonConfigMixin } from '../_mixins';
import { XpImageProps } from '../../media';

export interface SectionWithHeaderProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.SectionWithHeader;
    regions: Regions<'intro' | 'content'>;
    config: {
        showAlternativeAudience: boolean;
        showRelatedSituations: boolean;
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

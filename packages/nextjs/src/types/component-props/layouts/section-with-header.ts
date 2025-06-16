import { LayoutBaseProps, LayoutType, Regions } from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';
import { HeaderWithAnchorMixin, LayoutCommonConfigMixin } from 'types/component-props/_mixins';
import { XpImageProps } from 'types/media';

export interface SectionWithHeaderProps extends LayoutBaseProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.SectionWithHeader;
    regions: Regions<'intro' | 'content'>;
    config: {
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

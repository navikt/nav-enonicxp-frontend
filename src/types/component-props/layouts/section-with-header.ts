import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';
import { HeaderWithAnchorMixin, LayoutCommonConfigMixin } from '../_mixins';
import { XpImageProps } from '../../media';

export interface SectionWithHeaderProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.SectionWithHeader;
    regions: {
        intro: {
            components: ComponentProps[];
            name: 'intro';
        };
        content: {
            components: ComponentProps[];
            name: 'content';
        };
    };
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
    } & HeaderWithAnchorMixin &
        Pick<LayoutCommonConfigMixin, 'bgColor'>;
}

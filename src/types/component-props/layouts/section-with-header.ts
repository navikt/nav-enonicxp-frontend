import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';
import { LayoutCommonConfigMixin } from '../_mixins';
import { XpImageProps } from '../../media';

export interface SectionWithHeaderProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.SectionWithHeader;
    regions: {
        content: {
            components: ComponentProps[];
            name: 'content';
        };
    };
    config: {
        title: string;
        anchorId: string;
        icon?: { icon: XpImageProps; color?: string };
        border?: {
            color: string;
            rounded: boolean;
            width: number;
        };
    } & Pick<LayoutCommonConfigMixin, 'bgColor'>;
}

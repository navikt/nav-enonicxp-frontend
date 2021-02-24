import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';
import { HeaderCommonConfig } from '../_mixins';

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
    } & HeaderCommonConfig;
}

import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';

type Regions = 'contentTop' | 'contentBottom';

export interface IndexPageProps extends LayoutCommonProps {
    type: ComponentType.Page;
    descriptor: LayoutType.IndexPage;
    regions: {
        [key in Regions]: {
            components: ComponentProps[];
            name: Regions;
        };
    };
    config: {};
}

import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';

type Regions = 'pageContent';

export interface SingleColPageProps extends LayoutCommonProps {
    type: ComponentType.Page;
    descriptor: LayoutType.SingleColPage;
    regions: {
        [key in Regions]: {
            components: ComponentProps[];
            name: Regions;
        };
    };
    config: {};
}

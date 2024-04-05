import { LayoutCommonProps, LayoutType } from 'types/component-props/layouts';
import { ComponentProps, ComponentType } from 'types/component-props/_component-common';

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

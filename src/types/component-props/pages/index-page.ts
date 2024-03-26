import { LayoutCommonProps, LayoutType } from 'types/component-props/layouts';
import {
    ComponentProps,
    ComponentType,
} from 'types/component-props/_component-common';

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

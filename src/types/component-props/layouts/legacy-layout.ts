import { LayoutCommonProps, LayoutType } from '../layouts';
import { ComponentProps, ComponentType } from '../_component-common';

type LegacyRegions = 'first' | 'second';

export interface LegacyLayoutProps extends LayoutCommonProps {
    type: ComponentType.Layout | ComponentType.Page;
    descriptor: LayoutType.Main | LayoutType.Main1Col | LayoutType.MainPage;
    regions: {
        [key in LegacyRegions]: {
            components: ComponentProps[];
            name: LegacyRegions;
        };
    };
    config: {};
}

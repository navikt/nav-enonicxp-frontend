import { LayoutBaseProps, LayoutType, Regions } from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';

type LegacyRegions = 'first' | 'second';

export interface LegacyLayoutProps extends LayoutBaseProps {
    type: ComponentType.Layout | ComponentType.Page;
    descriptor: LayoutType.LegacyMain | LayoutType.LegacyMain1Col | LayoutType.MainPage;
    regions: Regions<LegacyRegions>;
}

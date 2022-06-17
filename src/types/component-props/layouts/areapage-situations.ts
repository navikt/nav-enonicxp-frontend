import { LayoutCommonProps, LayoutType, Regions } from '../layouts';
import { ComponentType } from '../_component-common';

export interface AreapageSituations extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.AreapageSituations;
    regions: Regions<'situations'>;
}

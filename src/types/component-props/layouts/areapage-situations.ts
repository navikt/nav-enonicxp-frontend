import {
    LayoutCommonProps,
    LayoutType,
    Regions,
} from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';

export interface AreapageSituationsProps extends LayoutCommonProps {
    type: ComponentType.Layout;
    descriptor: LayoutType.AreapageSituations;
    regions: Regions<'situations'>;
    config: {
        title: string;
    };
}

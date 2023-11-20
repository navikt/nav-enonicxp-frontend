import {
    LayoutCommonProps,
    LayoutType,
    Regions,
} from 'types/component-props/layouts';
import { ComponentType } from 'types/component-props/_component-common';

export type ProductDetailsPageRegionName =
    | 'intro'
    | 'main'
    | 'main_complaint'
    | 'outro';

export interface ProductDetailsPageProps extends LayoutCommonProps {
    type: ComponentType.Page;
    descriptor: LayoutType.ProductDetailsPage;
    regions: Regions<ProductDetailsPageRegionName>;
}

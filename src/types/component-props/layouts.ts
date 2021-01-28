import {
    ComponentCommonProps,
    ComponentProps,
    ComponentType,
} from './_component-common';
import { FlexColsLayoutProps } from './layouts/flex-cols';
import { FixedColsLayoutProps } from './layouts/fixed-cols';
import { LegacyLayoutProps } from './layouts/legacy-layout';

export enum LayoutType {
    Dynamic2Col = 'no.nav.navno:dynamic-2-col',
    Dynamic3Col = 'no.nav.navno:dynamic-3-col',
    Dynamic4Col = 'no.nav.navno:dynamic-4-col',
    DynamicFlexCols = 'no.nav.navno:dynamic-flex-cols',
    Main = 'no.nav.navno:main',
    Main1Col = 'no.nav.navno:main-1-col',
    MainPage = 'no.nav.navno:main-page',
}

export type RegionProps = {
    components: ComponentProps[];
    name: string;
};

export interface LayoutCommonProps extends ComponentCommonProps {
    type: ComponentType.Layout | ComponentType.Page;
    descriptor: LayoutType;
    regions?: { [key: string]: RegionProps };
    config: any;
}

export type LayoutProps =
    | LegacyLayoutProps
    | FlexColsLayoutProps
    | FixedColsLayoutProps;

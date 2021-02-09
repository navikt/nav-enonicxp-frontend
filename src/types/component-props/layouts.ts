import {
    ComponentCommonProps,
    ComponentProps,
    ComponentType,
} from './_component-common';
import { FlexColsLayoutProps } from './layouts/flex-cols';
import { FixedColsLayoutProps } from './layouts/fixed-cols';
import { LegacyLayoutProps } from './layouts/legacy-layout';
import { PageWithSideMenusProps } from './pages/page-with-side-menus';

export enum LayoutType {
    Fixed1Col = 'no.nav.navno:dynamic-1-col',
    Fixed2Col = 'no.nav.navno:dynamic-2-col',
    Fixed3Col = 'no.nav.navno:dynamic-3-col',
    Fixed4Col = 'no.nav.navno:dynamic-4-col',
    FlexCols = 'no.nav.navno:dynamic-flex-cols',
    LegacyMain = 'no.nav.navno:main',
    LegacyMain1Col = 'no.nav.navno:main-1-col',
    MainPage = 'no.nav.navno:main-page',
    PageWithSideMenus = 'no.nav.navno:page-with-side-menus',
}

export type RegionProps = {
    components: ComponentProps[];
    name: string;
};

export type LayoutCommonConfig = Partial<{
    marginTop: number;
    marginBottom: number;
    backgroundColor: string;
    bgFullWidth: boolean;
}>;

export interface LayoutCommonProps extends ComponentCommonProps {
    type: ComponentType.Layout | ComponentType.Page;
    descriptor: LayoutType;
    regions?: { [key: string]: RegionProps };
    config?: any;
}

export type LayoutProps =
    | LegacyLayoutProps
    | FlexColsLayoutProps
    | FixedColsLayoutProps
    | PageWithSideMenusProps;

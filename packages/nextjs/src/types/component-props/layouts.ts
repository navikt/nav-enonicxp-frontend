import { TwoColsPageProps } from 'types/component-props/pages/two-cols-page';
import { ProductDetailsPageProps } from 'types/component-props/pages/product-details-layout';
import { ComponentBaseProps, ComponentProps, ComponentType } from './_component-common';
import { FlexColsLayoutProps } from './layouts/flex-cols';
import { FixedColsLayoutProps } from './layouts/fixed-cols';
import { LegacyLayoutProps } from './layouts/legacy-layout';
import { PageWithSideMenusProps } from './pages/page-with-side-menus';
import { SectionWithHeaderProps } from './layouts/section-with-header';
import { SingleColPageProps } from './pages/single-col-page';
import { SituationPageFlexColsLayoutProps } from './layouts/situation-flex-cols';
import { ProductPageFlexColsLayoutProps } from './layouts/product-flex-cols';
import { IndexPageProps } from './pages/index-page';
import { AreapageSituationsProps } from './layouts/areapage-situations';
import { InnloggetSeksjonForsideLayoutProps } from './layouts/innlogget-seksjon-forside';

export enum LayoutType {
    Fixed1Col = 'no.nav.navno:dynamic-1-col',
    Fixed2Col = 'no.nav.navno:dynamic-2-col',
    Fixed3Col = 'no.nav.navno:dynamic-3-col',
    FlexCols = 'no.nav.navno:dynamic-flex-cols',
    LegacyMain = 'no.nav.navno:main',
    LegacyMain1Col = 'no.nav.navno:main-1-col',
    MainPage = 'no.nav.navno:main-page',
    PageWithSideMenus = 'no.nav.navno:page-with-side-menus',
    SectionWithHeader = 'no.nav.navno:section-with-header',
    SingleColPage = 'no.nav.navno:single-col-page',
    SituationPageFlexCols = 'no.nav.navno:situation-flex-cols',
    ProductPageFlexCols = 'no.nav.navno:product-flex-cols',
    ProductDetailsPage = 'no.nav.navno:product-details-page',
    IndexPage = 'no.nav.navno:index-page',
    AreapageSituations = 'no.nav.navno:areapage-situations',
    InnloggetSeksjonForside = 'no.nav.navno:frontpage-loggedin-section',
    TwoColsPage = 'no.nav.navno:two-cols-page',
}

export type RegionProps<Name = string> = {
    components: ComponentProps[];
    name: Name;
};

export type Regions<RegionNames extends string> = {
    [Name in RegionNames]: RegionProps<Name>;
};

export type LayoutBaseProps<RegionNames extends string = string> = ComponentBaseProps & {
    type: ComponentType.Layout | ComponentType.Page;
    descriptor: LayoutType;
    regions: Regions<RegionNames>;
    config?: any;
};

export type LayoutComponentProps =
    | LegacyLayoutProps
    | FlexColsLayoutProps
    | FixedColsLayoutProps
    | PageWithSideMenusProps
    | SectionWithHeaderProps
    | SingleColPageProps
    | SituationPageFlexColsLayoutProps
    | ProductPageFlexColsLayoutProps
    | IndexPageProps
    | AreapageSituationsProps
    | InnloggetSeksjonForsideLayoutProps
    | TwoColsPageProps
    | ProductDetailsPageProps;

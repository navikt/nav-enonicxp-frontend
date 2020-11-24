import {
    ComponentCommonProps,
    ComponentProps,
    ComponentType,
} from './_component-common';

enum LayoutType {
    Dynamic2Col = 'no.nav.navno:dynamic-2-col',
    Dynamic3Col = 'no.nav.navno:dynamic-3-col',
    Dynamic4Col = 'no.nav.navno:dynamic-4-col',
    Main = 'no.nav.navno:main',
    Main1Col = 'no.nav.navno:main-1-col',
    MainPage = 'no.nav.navno:main-page',
}

export type RegionProps = {
    components: ComponentProps[];
    name: string;
};

type RegionsProps = {
    [key: string]: RegionProps;
};

export type LayoutConfig = {
    distribution: string;
    margin: string;
};

export interface LayoutProps extends ComponentCommonProps {
    type: ComponentType.Layout | ComponentType.Page;
    descriptor: LayoutType;
    config?: LayoutConfig;
    regions?: RegionsProps;
}

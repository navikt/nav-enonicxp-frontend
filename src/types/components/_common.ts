import { PartType } from './parts';

type ComponentType = 'page' | 'layout' | 'part' | 'text' | 'image' | 'fragment';

type ComponentCommon = {
    type: ComponentType;
    path: string;
    descriptor: PartType;
};

export interface PageComponent extends ComponentCommon {
    type: 'page';
    regions?: { [key: string]: RegionProps };
}

export interface LayoutComponent extends ComponentCommon {
    type: 'layout';
    config?: {
        distribution: string;
        margin: string;
    };
    regions?: { [key: string]: RegionProps };
}

export interface PartComponent extends ComponentCommon {
    type: 'part';
}

export interface TextComponent extends ComponentCommon {
    type: 'text';
    value: string;
}

export interface ImageComponent extends ComponentCommon {
    type: 'image';
}

export interface FragmentComponent extends ComponentCommon {
    type: 'fragment';
}

export type ComponentProps =
    | PageComponent
    | LayoutComponent
    | PartComponent
    | TextComponent
    | ImageComponent
    | FragmentComponent;

export type RegionProps = {
    components: ComponentProps[];
    name: string;
};

export type RegionsProps = {
    [key: string]: RegionProps;
};

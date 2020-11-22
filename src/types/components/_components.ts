import { PartType } from './parts';

export type RegionProps = {
    components: ComponentProps[];
    name: string;
};

export type RegionsProps = {
    [key: string]: RegionProps;
};

export enum ComponentType {
    Page = 'page',
    Layout = 'layout',
    Part = 'part',
    Text = 'text',
    Image = 'image',
    Fragment = 'fragment',
}

export type ComponentCommonProps = {
    type: ComponentType;
    path: string;
};

export interface PageComponentProps extends ComponentCommonProps {
    type: ComponentType.Page;
    descriptor: string;
    regions?: RegionsProps;
}

export interface LayoutComponentProps extends ComponentCommonProps {
    type: ComponentType.Layout;
    descriptor: string;
    config?: {
        distribution: string;
        margin: string;
    };
    regions?: RegionsProps;
}

export interface PartComponent extends ComponentCommonProps {
    type: ComponentType.Part;
    descriptor: PartType;
}

export interface TextComponentProps extends ComponentCommonProps {
    type: ComponentType.Text;
    value: string;
}

export interface ImageComponentProps extends ComponentCommonProps {
    type: ComponentType.Image;
    image: {
        imageUrl: string;
    };
}

export interface FragmentComponentProps extends ComponentCommonProps {
    type: ComponentType.Fragment;
}

export type ComponentProps =
    | PageComponentProps
    | LayoutComponentProps
    | PartComponent
    | TextComponentProps
    | ImageComponentProps
    | FragmentComponentProps;

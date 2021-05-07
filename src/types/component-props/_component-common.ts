import { PartType } from './parts';
import { LayoutProps } from './layouts';

export enum ComponentType {
    Page = 'page',
    Layout = 'layout',
    Part = 'part',
    Text = 'text',
    Image = 'image',
    Fragment = 'fragment',
}

type SectionWithHeaderConfig = {
    expandable: boolean;
    expandableOpenByDefault: boolean;
    filters: string[];
    html: string;
};

export type ComponentCommonProps = {
    type: ComponentType;
    path: string;
    config?: any;
};

export interface PartComponentProps extends ComponentCommonProps {
    type: ComponentType.Part;
    descriptor: PartType;
}

export interface TextComponentProps extends ComponentCommonProps {
    type: ComponentType.Text;
    text: string;
}

export interface ImageComponentProps extends ComponentCommonProps {
    type: ComponentType.Image;
    image: {
        imageUrl: string;
    };
}

export interface FragmentComponentProps extends ComponentCommonProps {
    type: ComponentType.Fragment;
    fragment: ComponentProps;
}

export type ComponentProps =
    | LayoutProps
    | PartComponentProps
    | TextComponentProps
    | ImageComponentProps
    | FragmentComponentProps;

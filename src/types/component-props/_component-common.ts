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

export type ComponentCommonProps = {
    type: ComponentType;
    path: string;
};

export interface PartComponentProps extends ComponentCommonProps {
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
    | LayoutProps
    | PartComponentProps
    | TextComponentProps
    | ImageComponentProps
    | FragmentComponentProps;

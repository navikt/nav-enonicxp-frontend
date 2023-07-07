import { PartType } from './parts';
import { LayoutProps } from './layouts';
import { ContentProps } from '../content-props/_content-common';

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
    config?: unknown;
};

export type PartComponentProps = ComponentCommonProps & {
    type: ComponentType.Part;
    descriptor: PartType;
    pageProps: ContentProps;
};

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

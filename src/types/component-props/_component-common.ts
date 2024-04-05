import { PartType } from './parts';
import { LayoutProps } from './layouts';
import { ContentProps } from 'types/content-props/_content-common';
import { RenderOnAuthStateMixin } from 'types/component-props/_mixins';

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
    config?: Record<string, unknown> & RenderOnAuthStateMixin;
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

import { LayoutProps } from './layouts';
import { RenderOnAuthStateMixin } from 'types/component-props/_mixins';
import { PartComponentProps } from './parts';

export enum ComponentType {
    Page = 'page',
    Layout = 'layout',
    Part = 'part',
    Text = 'text',
    Image = 'image',
    Fragment = 'fragment',
}

export type NavNoDescriptor<Name extends string = string> =
    `no.nav.navno:${Name}`;

type ConfigType = Record<string, unknown>;

export type ComponentCommonProps<
    Type extends ComponentType = ComponentType,
    Descriptor extends NavNoDescriptor = NavNoDescriptor,
    Config extends ConfigType = ConfigType,
> = {
    path: string;
    type: Type;
    descriptor: Descriptor;
    config: Config & RenderOnAuthStateMixin;
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

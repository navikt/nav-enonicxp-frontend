import { RenderOnAuthStateMixin } from 'types/component-props/_mixins';
import { LayoutComponentProps } from './layouts';
import { PartComponentProps } from './parts';

export enum ComponentType {
    Page = 'page',
    Layout = 'layout',
    Part = 'part',
    Text = 'text',
    Fragment = 'fragment',
}

export type NavNoDescriptor<Name extends string = string> = `no.nav.navno:${Name}`;

type ConfigType = Record<string, unknown>;

export type ComponentBaseProps<
    Type extends ComponentType = ComponentType,
    Descriptor extends NavNoDescriptor = NavNoDescriptor,
    Config extends ConfigType = ConfigType,
> = {
    path: string;
    type: Type;
    descriptor: Descriptor;
    config: Config & RenderOnAuthStateMixin;
};

export type TextComponentProps = ComponentBaseProps<ComponentType.Text> & {
    text: string;
};

export type FragmentComponentProps = ComponentBaseProps<ComponentType.Fragment> & {
    fragment: LayoutComponentProps | PartComponentProps | TextComponentProps;
};

export type ComponentProps =
    | LayoutComponentProps
    | PartComponentProps
    | TextComponentProps
    | FragmentComponentProps;

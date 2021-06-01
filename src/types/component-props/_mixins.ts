import { ContentListProps } from '../content-props/content-list-props';
import { ContentProps } from '../content-props/_content-common';
import { TypoStyle } from '../typo-style';
import { AnimatedIconsProps } from '../content-props/animated-icons';
import { ProductLabel } from '../content-props/dynamic-page-props';

export type HeaderWithAnchorMixin = {
    title: string;
    anchorId: string;
    hideCopyButton: boolean;
};

export type ProductDataMixin = {
    title: string;
    ingress?: string;
    label?: ProductLabel;
    illustration: AnimatedIconsProps;
};

export type LinkSelectable = {
    _selected: 'internal' | 'external';
    internal: InternalLinkMixin;
    external: ExternalLinkMixin;
};

export type ContentListMixin = {
    target: ContentListProps;
};

export type InternalLinkMixin = {
    target: ContentProps;
    text?: string;
};

export type ExternalLinkMixin = {
    url: string;
    text: string;
};

export type LinkWithIngressMixin = {
    ingress?: string;
    link: LinkSelectable;
};

export type ExpandableMixin = {
    expandable: boolean;
    expandableOpenByDefault: boolean;
    expandableTitle: string;
};

export type FiltersMixin = {
    filters: string[];
};

export type ColorMixin = {
    color: string;
};

export type LayoutCommonConfigMixin = Partial<{
    marginTop: number;
    marginBottom: number;
    bgColor: ColorMixin;
    paddingSides: {
        _selected: 'standard' | 'fullWidth' | 'custom';
        custom?: {
            remValue: number;
        };
    };
}>;

export type HeaderCommonConfig = {
    justify: 'left' | 'center' | 'right';
    typo: {
        _selected: 'default' | 'custom';
        custom: {
            typo: TypoStyle;
        };
    };
};

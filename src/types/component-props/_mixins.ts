import { ContentListProps } from '../content-props/content-list-props';
import { ContentProps } from '../content-props/_content-common';
import { TypoStyle } from '../typo-style';

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

export type LayoutCommonConfigMixin = Partial<{
    marginTop: number;
    marginBottom: number;
    backgroundColor: string;
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

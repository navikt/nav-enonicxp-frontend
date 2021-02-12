import { ContentListProps } from '../content-props/content-list-props';
import { ContentProps } from '../content-props/_content-common';

export type LinkSelectable = {
    _selected: 'internal' | 'external';
    internal: InternalLinkMixin;
    external: ExternalLinkMixin;
};

export type ContentListMixin = {
    numLinks?: number;
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

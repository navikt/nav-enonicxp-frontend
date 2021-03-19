import { ContentListProps } from '../content-props/content-list-props';
import { ContentProps } from '../content-props/_content-common';

export type LinkSelectable = {
    _selected: 'internal' | 'external';
    internal: InternalLinkMixin;
    external: ExternalLinkMixin;
};

export type DateTimeOption =
    | 'createdTime'
    | 'modifiedTime'
    | 'publish.from'
    | 'publish.first';

export type ContentListMixin = {
    dateLabelOption?: DateTimeOption;
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

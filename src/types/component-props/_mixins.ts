import { ContentListProps } from '../content-props/content-list-props';
import { ContentProps } from '../content-props/_content-common';
import { LinkProps } from '../link-props';

export type ContentListMixin = {
    numLinks?: number;
    target: ContentListProps;
};

export type LinksMixin = {
    _selected: 'internal' | 'external';
    internal: {
        target: ContentProps;
        text?: string;
    };
    external: LinkProps;
};

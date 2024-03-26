import { ExpandableMixin, ContentListMixin, LinkSelectable } from 'types/component-props/_mixins';
import { OptionSetSingle } from 'types/util-types';

export type ListType = 'default' | 'chevron' | 'bulletlist';

export type PartConfigLinkList = {
    title?: string;
    hideTitle?: boolean;
    listType: ListType;
    list: OptionSetSingle<{
        contentList: ContentListMixin;
        linkList: {
            links: LinkSelectable[];
        };
    }>;
} & ExpandableMixin;

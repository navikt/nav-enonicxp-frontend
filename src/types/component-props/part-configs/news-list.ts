import { LinkProps } from 'types/link-props';
import { ExpandableMixin, ContentListMixin } from 'types/component-props/_mixins';

export type PartConfigNewsList = {
    title?: string;
    hideTitle?: boolean;
    contentList: ContentListMixin;
    moreNews?: LinkProps;
} & ExpandableMixin;

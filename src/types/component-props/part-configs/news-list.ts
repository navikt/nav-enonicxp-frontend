import { LinkProps } from '../../link-props';
import { ExpandableMixin, ContentListMixin } from '../_mixins';

export type PartConfigNewsList = {
    title?: string;
    hideTitle?: boolean;
    contentList: ContentListMixin;
    moreNews?: LinkProps;
} & ExpandableMixin;

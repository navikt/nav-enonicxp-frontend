import { PartType } from '../parts';
import { PartComponentProps } from '../_component-common';
import { LinkProps } from '../../link-props';
import {
    ExpandableMixin,
    ContentListMixin,
    RenderOnAuthStateMixin,
} from '../_mixins';

export interface DynamicNewsList extends PartComponentProps {
    descriptor: PartType.NewsList;
    config: {
        title?: string;
        contentList: ContentListMixin;
        moreNews?: LinkProps;
    } & ExpandableMixin &
        RenderOnAuthStateMixin;
}

import { PartType } from 'types/component-props/parts';
import { PartComponentProps } from 'types/component-props/_component-common';
import { LinkProps } from 'types/link-props';
import {
    ExpandableMixin,
    ContentListMixin,
    RenderOnAuthStateMixin,
} from 'types/component-props/_mixins';

export interface DynamicNewsListProps extends PartComponentProps {
    descriptor: PartType.NewsList;
    config: {
        title?: string;
        hideTitle?: boolean;
        contentList: ContentListMixin;
        moreNews?: LinkProps;
    } & ExpandableMixin &
        RenderOnAuthStateMixin;
}

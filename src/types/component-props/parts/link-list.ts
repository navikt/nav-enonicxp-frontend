import { PartComponentProps } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import {
    ExpandableMixin,
    ContentListMixin,
    LinkSelectable,
    RenderOnAuthStateMixin,
} from 'types/component-props/_mixins';
import { OptionSetSingle } from 'types/util-types';

export type ListType = 'default' | 'chevron' | 'bulletlist';

export interface DynamicLinkListProps extends PartComponentProps {
    descriptor: PartType.LinkList;
    config: {
        title?: string;
        hideTitle?: boolean;
        listType: ListType;
        list: OptionSetSingle<{
            contentList: ContentListMixin;
            linkList: {
                links: LinkSelectable[];
            };
        }>;
    } & ExpandableMixin &
        RenderOnAuthStateMixin;
}

import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    ExpandableMixin,
    ContentListMixin,
    LinkSelectable,
    RenderOnAuthStateMixin,
} from '../_mixins';
import { OptionSetSingle } from '../../util-types';

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

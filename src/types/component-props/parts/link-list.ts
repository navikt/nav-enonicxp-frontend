import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    ExpandableMixin,
    ContentListMixin,
    LinkSelectable,
    RenderOnAuthStateMixin,
} from '../_mixins';

export interface DynamicLinkListProps extends PartComponentProps {
    descriptor: PartType.LinkList;
    config: {
        title?: string;
        chevron?: boolean;
        list: {
            _selected: 'contentList' | 'linkList';
            contentList: ContentListMixin;
            linkList: {
                links: LinkSelectable[];
            };
        };
    } & ExpandableMixin &
        RenderOnAuthStateMixin;
}

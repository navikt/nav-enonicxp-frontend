import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ExpandableMixin, ContentListMixin, LinkSelectable } from '../_mixins';

export interface DynamicLinkListProps extends PartComponentProps {
    descriptor: PartType.LinkList;
    config: {
        title?: string;
        list: {
            _selected: 'contentList' | 'linkList';
            contentList: ContentListMixin;
            linkList: {
                links: LinkSelectable[];
            };
        };
    } & ExpandableMixin;
}

import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ContentListMixin, LinkSelectable } from '../_mixins';

export interface DynamicLinkList extends PartComponentProps {
    descriptor: PartType.LinkList;
    config: Partial<{
        title: string;
        list: {
            _selected: 'contentList' | 'linkList';
            contentList: ContentListMixin;
            linkList: {
                links: LinkSelectable[];
            };
        };
    }>;
}

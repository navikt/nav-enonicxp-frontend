import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import {
    ExpandableMixin,
    ContentListMixin,
    LinkSelectable,
    RenderOnAuthStateMixin,
} from '../_mixins';
import { OptionSetSingle } from '../../util-types';

export interface DynamicLinkListProps extends PartComponentProps {
    descriptor: PartType.LinkList;
    config: {
        title?: string;
        hideTitle?: boolean;
        chevron?: boolean;
        list: OptionSetSingle<{
            contentList: ContentListMixin;
            linkList: {
                links: LinkSelectable[];
            };
        }>;
    } & ExpandableMixin &
        RenderOnAuthStateMixin;
}

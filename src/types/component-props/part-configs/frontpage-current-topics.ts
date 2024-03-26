import { ContentListData } from 'types/content-props/content-list-props';
import { LinkSelectable } from 'types/component-props/_mixins';

export type PartConfigFrontpageCurrentTopics = {
    title: string;
    contentList?: { data: ContentListData };
    link: LinkSelectable;
};

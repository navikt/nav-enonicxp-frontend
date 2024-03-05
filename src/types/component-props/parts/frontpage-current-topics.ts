import { PartType } from '../parts';
import { PartComponentProps } from '../_component-common';
import { ContentListData } from 'types/content-props/content-list-props';
import { ContentProps } from 'types/content-props/_content-common';
import { LinkSelectable } from '../_mixins';

export interface FrontpageCurrentTopicsProps extends PartComponentProps {
    descriptor: PartType.FrontpageCurrentTopics;
    config: {
        title: string;
        contentList?: { data: ContentListData };
        link: LinkSelectable;
    };
}

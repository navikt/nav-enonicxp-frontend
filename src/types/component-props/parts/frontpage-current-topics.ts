import { PartType } from '../parts';
import { PartComponentProps } from '../_component-common';
import { ContentListData } from 'types/content-props/content-list-props';

export interface FrontpageCurrentTopicsProps extends PartComponentProps {
    descriptor: PartType.FrontpageCurrentTopics;
    config: {
        title: string;
        contentList?: { data: ContentListData };
    };
}

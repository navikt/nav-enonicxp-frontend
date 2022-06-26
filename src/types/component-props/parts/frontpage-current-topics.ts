import { PartType } from '../parts';
import { PartComponentProps } from '../_component-common';
import { FrontpageContentListData } from './frontpage-shortcuts';

export interface FrontpageCurrentTopicsProps extends PartComponentProps {
    descriptor: PartType.FrontpageCurrentTopics;
    config: {
        title: string;
        contentList: FrontpageContentListData;
    };
}

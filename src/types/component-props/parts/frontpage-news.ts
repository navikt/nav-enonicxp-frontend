import { ContentProps } from 'types/content-props/_content-common';
import { PartType } from '../parts';
import { PartComponentProps } from '../_component-common';

export interface FrontpageNewsProps extends PartComponentProps {
    descriptor: PartType.FrontpageNews;
    config: {
        title: string;
        newsList: ContentProps[];
        moreNews: {
            url: string;
            text: string;
        };
    };
}

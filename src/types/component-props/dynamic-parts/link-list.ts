import { PartComponentProps } from '../_component-common';
import { PartType } from '../parts';
import { ContentListProps } from '../../content-props/content-list-props';
import { ContentProps } from '../../content-props/_content-common';

type LinkListLink = {
    _selected: 'internal' | 'external';
    internal: {
        target: ContentProps;
        text?: string;
    };
    external: {
        url: string;
        text: string;
    };
};

export interface DynamicLinkList extends PartComponentProps {
    descriptor: PartType.LinkList;
    config: Partial<{
        title: string;
        list: {
            _selected: 'contentList' | 'linkList';
            contentList: {
                numLinks?: number;
                target: ContentListProps;
            };
            linkList: {
                links: LinkListLink[];
            };
        };
    }>;
}

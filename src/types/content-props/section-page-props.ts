import {
    ContentType,
    ContentCommonProps,
    ContentProps,
} from './_content-common';
import { LinkPanel } from '../link-panel';
import { ContentListProps } from './content-list-props';

export type SectionPageData = Partial<{
    panelsHeading: string;
    panelItems: LinkPanel[];
    tableContents: ContentProps[];
    newsContents: ContentListProps;
    moreNewsUrl: string;
    ntkContents: ContentListProps;
    scContents: ContentListProps;
}>;

export type SectionPageProps = ContentCommonProps & {
    type: ContentType.SectionPage;
    data: SectionPageData;
};

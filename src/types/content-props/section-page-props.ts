import { ContentType, ContentProps } from './_content-common';
import { LinkPanel } from '../link-panel';
import { ContentListProps } from './content-list-props';

export type SectionPageData = Partial<{
    panelsHeading: string;
    panelItems: LinkPanel[];
    nrTableEntries: number;
    tableContents: ContentProps[];
    nrNews: number;
    newsContents: ContentListProps;
    moreNewsUrl: string;
    nrNTK: number;
    ntkContents: ContentListProps;
    nrSC: number;
    scContents: ContentListProps;
    metaDescription: string;
}>;

export interface SectionPageProps extends ContentProps {
    __typename: ContentType.SectionPage;
    data: SectionPageData;
}

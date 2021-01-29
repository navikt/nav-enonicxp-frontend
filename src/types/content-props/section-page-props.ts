import { ContentType, ContentProps } from './_content-common';
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
    metaDescription: string;
    canonicalUrl: string;
    noindex: boolean;
    feedbackToggle: boolean;
}>;

export interface SectionPageProps extends ContentProps {
    __typename: ContentType.SectionPage;
    data: SectionPageData;
}

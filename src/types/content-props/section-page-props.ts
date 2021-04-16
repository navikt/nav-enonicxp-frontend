import { ContentType, ContentProps, SeoDataProps } from './_content-common';
import { LinkPanel } from '../link-panel';
import { ContentListProps } from './content-list-props';
import { LanguageProps } from '../language';

export type SectionPageData = Partial<{
    panelsHeading: string;
    panelItems: LinkPanel[];
    tableContents: ContentProps[];
    newsContents: ContentListProps;
    moreNewsUrl: string;
    ntkContents: ContentListProps;
    scContents: ContentListProps;
    feedbackToggle: boolean;
    languages: LanguageProps[];
}> &
    SeoDataProps;

export interface SectionPageProps extends ContentProps {
    __typename: ContentType.SectionPage;
    data: SectionPageData;
}

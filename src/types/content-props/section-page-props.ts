import {
    ContentType,
    ContentProps,
    SeoDataProps,
    ContentDecoratorToggles,
} from './_content-common';
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
    languages: LanguageProps[];
}> &
    SeoDataProps &
    ContentDecoratorToggles;

export interface SectionPageProps extends ContentProps {
    __typename: ContentType.SectionPage;
    data: SectionPageData;
}

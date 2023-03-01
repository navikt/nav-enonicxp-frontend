import {
    ContentType,
    ContentCommonProps,
    ContentProps,
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
}>;

export interface SectionPageProps extends ContentCommonProps {
    type: ContentType.SectionPage;
    data: SectionPageData;
}

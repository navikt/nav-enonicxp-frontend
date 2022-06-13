import {
    ContentType,
    CustomContentCommonProps,
    CustomContentProps,
} from './_content-common';
import { LinkPanel } from '../link-panel';
import { ContentListProps } from './content-list-props';
import { LanguageProps } from '../language';

export type SectionPageData = Partial<{
    panelsHeading: string;
    panelItems: LinkPanel[];
    tableContents: CustomContentProps[];
    newsContents: ContentListProps;
    moreNewsUrl: string;
    ntkContents: ContentListProps;
    scContents: ContentListProps;
    languages: LanguageProps[];
}>;

export interface SectionPageProps extends CustomContentCommonProps {
    __typename: ContentType.SectionPage;
    data: SectionPageData;
}

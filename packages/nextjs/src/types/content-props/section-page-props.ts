import { Lenkepanel } from 'types/lenkepanel';
import { ContentType, ContentCommonProps, ContentProps } from './_content-common';
import { ContentListProps } from './content-list-props';

export type SectionPageData = {
    panelsHeading?: string;
    panelItems?: Lenkepanel[];
    tableContents?: ContentProps[];
    newsContents?: ContentListProps;
    moreNewsUrl?: string;
    ntkContents?: ContentListProps;
    scContents?: ContentListProps;
};

export type SectionPageProps = ContentCommonProps & {
    type: ContentType.SectionPage;
    data: SectionPageData;
};

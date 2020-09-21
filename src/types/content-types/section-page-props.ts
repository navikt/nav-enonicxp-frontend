import { ContentType, ContentTypeSchema, GlobalSchema } from './_schema';
import { LinkPanel } from '../link-panel';
import { ContentListProps } from './content-list-props';

export interface SectionPageProps extends GlobalSchema {
    __typename: ContentType.SectionPage;
    data: {
        panelsHeading?: string;
        panelItems?: LinkPanel[];
        nrTableEntries?: number;
        tableContents?: ContentTypeSchema[];
        nrNews?: number;
        newsContents?: ContentListProps;
        moreNewsUrl?: string;
        nrNTK?: number;
        ntkContents?: ContentListProps;
        nrSC?: number;
        scContents?: ContentListProps;
    };
}

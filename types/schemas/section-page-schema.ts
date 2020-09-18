import { ContentType, ContentTypeSchemas, GlobalSchema } from './_schemas';
import { LinkPanel } from '../linkpanel';
import { ContentListSchema } from './content-list-schema';

export interface SectionPageSchema extends GlobalSchema {
    type: ContentType.SectionPage;
    data: {
        ingress?: string;
        metaDescription?: string;
        nrTableEntries?: number;
        tableContents?: ContentTypeSchemas[];
        panelsHeading?: string;
        panelItems?: LinkPanel[];
        nrNews?: number;
        newsContents?: ContentListSchema;
        moreNewsUrl?: string;
        nrNTK?: number;
        ntkContents?: ContentListSchema;
        nrSC?: number;
        scContents?: ContentListSchema;
    };
}

import { EnonicRef, isEnonicId } from '../../utils/enonic-ref';
import { ContentType, ContentTypeSchemas, GlobalSchema } from './_schemas';
import { LinkPanel } from '../linkpanel';
import { ContentListSchema } from './content-list-schema';
import {
    fetchContentArray,
    fetchContentIfEnonicId,
    fetchEnonicPage,
} from '../../utils/fetch-content';

type SectionPageDataSchema = {
    ingress?: string;
    metaDescription?: string;
    nrTableEntries?: number;
    tableContents?: EnonicRef[];
    panelsHeading?: string;
    panelItems?: LinkPanel[];
    nrNews?: number;
    newsContents?: EnonicRef;
    moreNewsUrl?: string;
    nrNTK?: number;
    ntkContents?: EnonicRef;
    nrSC?: number;
    scContents?: EnonicRef;
};

export interface SectionPageSchema extends GlobalSchema {
    type: ContentType.SectionPage;
    data: SectionPageDataSchema;
}

type DataContentToFetch = {
    tableContents?: ContentTypeSchemas[];
    newsContents?: ContentListSchema;
    ntkContents?: ContentListSchema;
    scContents?: ContentListSchema;
};

type SectionPageProps = Omit<SectionPageSchema, 'data'> & {
    data: Omit<SectionPageDataSchema, keyof DataContentToFetch> &
        DataContentToFetch;
};

export const SectionPagePropsProxy = async (
    input: SectionPageSchema
): Promise<SectionPageProps> => {
    return {
        ...input,
        data: {
            ...input.data,
            tableContents: await fetchContentArray<ContentTypeSchemas>(
                input.data.tableContents
            ),
            newsContents: await fetchContentIfEnonicId<ContentListSchema>(
                input.data.newsContents
            ),
            ntkContents: await fetchContentIfEnonicId<ContentListSchema>(
                input.data.ntkContents
            ),
            scContents: await fetchContentIfEnonicId<ContentListSchema>(
                input.data.scContents
            ),
        },
    };
};

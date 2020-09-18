import { ContentTypeSchemas } from '../types/schemas/_schemas';
import { EnonicId } from './enonic-id';

const xpServiceUrl = process.env.XP_SERVICE_URL;

const getTargetIfRedirect = (contentData: ContentTypeSchemas) => {
    switch (contentData?.type) {
        case 'portal:site':
            return '/www.nav.no/forsiden';
        case 'no.nav.navno:internal-link':
            return contentData.data.target;
        default:
            return null;
    }
};

export const fetchContentFromIdArray = async <T>(
    ids: EnonicId[]
): Promise<T[]> => {
    const data: T[] = [];

    for await (const [key, value] of Object.entries(ids)) {
        data[key] = await fetchContent<T>(value);
    }

    return data;
};

export const fetchContent = <T>(idOrPath: string): Promise<T> =>
    fetch(`${xpServiceUrl}/sitecontent?id=${idOrPath}`)
        .then((res) => res.json())
        .catch(console.error);

export const fetchPageContent = async (
    idOrPath: string
): Promise<ContentTypeSchemas> => {
    console.log('id or path:', idOrPath);
    const content = await fetchContent<ContentTypeSchemas>(idOrPath);

    const redirectTarget = getTargetIfRedirect(content);

    if (redirectTarget) {
        return fetchPageContent(redirectTarget);
    }

    return content;
};

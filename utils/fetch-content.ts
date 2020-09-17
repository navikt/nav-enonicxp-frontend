import { ContentType, ContentTypeSchemas } from '../types/schemas/_schemas';
import { SectionPagePropsProxy } from '../types/schemas/section-page-schema';
import { EnonicRef, isEnonicId } from './enonic-ref';

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

export const fetchContentIfEnonicId = <T>(value: any): T => {
    return typeof value === 'string' && isEnonicId(value)
        ? fetchEnonicContent<T>(value)
        : value;
};

export const fetchContentArray = async <T>(
    content: EnonicRef[]
): Promise<T[]> => {
    const data: T[] = [];

    for await (const [key, value] of Object.entries(content)) {
        data[key] = await fetchContentIfEnonicId<T>(value);
    }

    return data;
};

export const fetchEnonicContent = <T>(idOrPath: string): Promise<T> =>
    fetch(`${xpServiceUrl}/sitecontent?id=${idOrPath}`)
        .then((res) => res.json())
        .catch(console.error);

export const fetchEnonicPage = async (idOrPath: string): Promise<any> => {
    console.log('id or path:', idOrPath);
    const content: ContentTypeSchemas = await fetch(
        `${xpServiceUrl}/sitecontent?id=${idOrPath}`
    )
        .then((res) => res.json())
        .catch(console.error);

    const redirectTarget = getTargetIfRedirect(content);

    if (redirectTarget) {
        return fetchEnonicPage(redirectTarget);
    }

    switch (content.type) {
        case ContentType.SectionPage:
            return await SectionPagePropsProxy(content);
        default:
            return content as ContentTypeSchemas;
    }
};

import { ContentType, ContentTypeSchemas } from '../types/schemas/_schemas';
import { contentToComponentMap } from '../components/content-component-mapper/ContentComponentMapper';
import { enonicContentBasePath } from '../config';

const xpServiceUrl = process.env.XP_SERVICE_URL;
const xpBaseUrl = process.env.XP_BASE_URL;

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

const fetchHtml = async (path: string): Promise<string | void> =>
    fetch(`${xpBaseUrl}${encodeURI(path)}`)
        .then((res) => res.text())
        .catch(console.error);

export const fetchContent = (idOrPath: string): Promise<ContentTypeSchemas> =>
    fetch(`${xpServiceUrl}/sitecontent?id=${idOrPath}`)
        .then((res) => res.json())
        .catch(console.error);

export const fetchPageContent = async (
    idOrPath: string
): Promise<ContentTypeSchemas> => {
    const content = await fetchContent(idOrPath);

    const redirectTarget = getTargetIfRedirect(content);

    if (redirectTarget) {
        return fetchPageContent(redirectTarget);
    }

    if (!contentToComponentMap[content.type]) {
        const path = content._path.replace(enonicContentBasePath, '');
        const html = await fetchHtml(path);
        return {
            ...content,
            type: ContentType.NotImplemented,
            data: { html: html || undefined },
        };
    }

    return content;
};

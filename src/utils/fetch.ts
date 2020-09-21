import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';

const xpServiceUrl = process.env.XP_SERVICE_URL;
const xpBaseUrl = process.env.XP_BASE_URL;

const getTargetIfRedirect = (contentData: ContentTypeSchema) => {
    switch (contentData?.__typename) {
        case ContentType.Site:
            return '/www.nav.no/forsiden';
        case ContentType.InternalLink:
            return contentData.data.target._path;
        default:
            return null;
    }
};

export const fetchHtml = (path: string): Promise<string | void> =>
    fetch(`${xpBaseUrl}${encodeURI(path)}`)
        .then((res) => res.text())
        .catch((e) => {
            console.error(`Failed to fetch html: ${e}`);
        });

export const fetchContent = (idOrPath: string): Promise<ContentTypeSchema> =>
    fetch(`${xpServiceUrl}/sitecontent?id=${encodeURI(idOrPath)}`)
        .then((res) => res.json())
        .catch((e) => {
            console.error(`Failed to fetch content: ${e}`);
        });

export const fetchPage = async (
    idOrPath: string,
    didRedirect: boolean = false
): Promise<ContentTypeSchema> => {
    const content = {
        ...(await fetchContent(idOrPath)),
        didRedirect: didRedirect,
    };

    const redirectTarget = getTargetIfRedirect(content);

    if (redirectTarget) {
        return fetchPage(redirectTarget, true);
    }

    return content;
};

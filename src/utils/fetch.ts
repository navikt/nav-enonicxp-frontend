import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import { makeErrorProps } from '../types/content-types/error-props';

const xpServiceUrl = process.env.XP_SERVICE_URL;
const xpBaseUrl = process.env.APP_ORIGIN;

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

const timeoutPromise = (timeout: number): Promise<any> =>
    new Promise((res) =>
        setTimeout(
            () =>
                res({ ok: false, status: 408, statusText: 'Request Timeout' }),
            timeout
        )
    );

export const fetchHtml = (path: string): Promise<string | void> =>
    Promise.race([
        fetch(`${xpBaseUrl}${encodeURI(path)}?legacy=true`),
        timeoutPromise(5000),
    ])
        .then((res) => {
            if (!res.ok) {
                const error = `Failed to fetch html: ${res.status} - ${res.statusText}`;
                return makeErrorProps(path, error);
            }
            return res.text();
        })
        .catch(console.error);

export const fetchContent = (idOrPath: string): Promise<ContentTypeSchema> =>
    Promise.race([
        fetch(`${xpServiceUrl}/sitecontent?id=${encodeURI(idOrPath)}`),
        timeoutPromise(5000),
    ])
        .then((res) => {
            if (!res.ok) {
                const error = `Failed to fetch content: ${res.status} - ${res.statusText}`;
                console.error(error);
                return makeErrorProps(idOrPath, error);
            }
            return res.json();
        })
        .catch(console.error);

export const fetchPage = async (
    idOrPath: string,
    didRedirect: boolean = false
): Promise<ContentTypeSchema> => {
    const content = await fetchContent(idOrPath);

    const redirectTarget = getTargetIfRedirect(content);

    if (redirectTarget) {
        return fetchPage(redirectTarget, true);
    }

    return content
        ? { ...content, didRedirect: didRedirect }
        : makeErrorProps(idOrPath, 'Unspecified error');
};

import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import { makeErrorProps } from '../types/content-types/error-props';
import { contentToComponentMap } from '../components/ContentToComponentMapper';
import { enonicContentBasePath, legacyPathPrefix } from './paths';
import { fetchWithTimeout } from './fetchWithTimeout';
import { Breadcrumb } from '../types/breadcrumb';
import { NotificationProps } from '../types/content-types/notification-props';

const xpServiceUrl = process.env.XP_SERVICE_URL;
const xpLegacyUrl = `${process.env.XP_ORIGIN}${legacyPathPrefix}`;

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

const fetchLegacyHtml = (path: string) => {
    const url = `${xpLegacyUrl}/${path[0] === '/' ? path.slice(1) : path}`;
    return fetchWithTimeout(url, 5000)
        .then((res) => {
            if (res.ok) {
                return res;
            }
            return {
                ...res,
                statusText: `Failed to fetch legacy html from ${path} at ${url}`,
            };
        })
        .catch(console.error);
};

const fetchContent = (idOrPath: string): Promise<ContentTypeSchema> =>
    fetchWithTimeout(
        `${xpServiceUrl}/sitecontent?id=${encodeURIComponent(idOrPath)}`,
        5000
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            const error = `Failed to fetch content from ${idOrPath}: ${res.statusText}`;
            return makeErrorProps(idOrPath, error, res.status);
        })
        .catch(console.error);

export const fetchNotifications = (
    path?: string
): Promise<NotificationProps[] | void> =>
    fetchWithTimeout(
        `${xpServiceUrl}/notifications${path ? `?path=${path}` : ''}`,
        5000
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            const error = `Failed to fetch notifications: ${res.statusText}`;
            console.log(error);
            return [];
        })
        .catch(console.error);

export const fetchBreadcrumbs = (idOrPath: string): Promise<Breadcrumb[]> =>
    fetchWithTimeout(
        `${xpServiceUrl}/breadcrumbs?id=${encodeURIComponent(idOrPath)}`,
        5000
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            const error = `Failed to fetch breadcrumb from ${idOrPath}: ${res.statusText}`;
            console.log(error);
            return [];
        })
        .catch(console.error);

export const fetchLanguages = (idOrPath: string): Promise<Breadcrumb[]> =>
    fetchWithTimeout(
        `${xpServiceUrl}/languages?id=${encodeURIComponent(idOrPath)}`,
        5000
    )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            const error = `Failed to fetch language from ${idOrPath}: ${res.statusText}`;
            console.log(error);
            return [];
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

    if (content && !contentToComponentMap[content.__typename]) {
        const path = content._path?.replace(enonicContentBasePath, '');
        const legacyContent = (await fetchLegacyHtml(path).then(async (res) => {
            if (!res.ok) {
                return makeErrorProps(path, res.statusText, res.status);
            }
            return {
                ...content,
                __typename: ContentType.Legacy,
                data: { html: await res.text() },
            };
        })) as ContentTypeSchema;

        return { ...legacyContent, didRedirect: didRedirect };
    }

    return content
        ? { ...content, didRedirect: didRedirect }
        : makeErrorProps(idOrPath, `Unknown fetch error from ${idOrPath}`);
};

import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import { makeErrorProps } from '../types/content-types/error-props';
import { contentToComponentMap } from '../components/ContentToComponentMapper';
import {
    draftPathPrefix,
    enonicContentBasePath,
    legacyPathPrefix,
} from './paths';
import { fetchWithTimeout } from './fetchWithTimeout';
import { Breadcrumb } from '../types/breadcrumb';
import { NotificationProps } from '../types/content-types/notification-props';
import { Language } from '../types/languages';

const xpServiceUrl = process.env.XP_SERVICE_URL;
const xpLegacyUrl = `${process.env.XP_ORIGIN}${legacyPathPrefix}`;
const xpDraftUrl = `${process.env.ADMIN_ORIGIN}${draftPathPrefix}`;
const xpDraftServiceUrl = `${process.env.ADMIN_ORIGIN}${draftPathPrefix}/_/service/no.nav.navno`;

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

const fetchLegacyHtml = (path: string, draft = false) => {
    const url = `${draft ? xpDraftUrl : xpLegacyUrl}/${
        path[0] === '/' ? path.slice(1) : path
    }`;
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

const fetchContent = (
    idOrPath: string,
    draft = false
): Promise<ContentTypeSchema> =>
    fetchWithTimeout(
        `${
            draft ? xpDraftServiceUrl : xpServiceUrl
        }/sitecontent?id=${encodeURIComponent(idOrPath)}`,
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
    path?: string,
    draft = false
): Promise<NotificationProps[]> =>
    fetchWithTimeout(
        `${draft ? xpDraftServiceUrl : xpServiceUrl}/notifications${
            path ? `?path=${path}` : ''
        }`,
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

export const fetchBreadcrumbs = (
    idOrPath: string,
    draft = false
): Promise<Breadcrumb[]> =>
    fetchWithTimeout(
        `${
            draft ? xpDraftServiceUrl : xpServiceUrl
        }/breadcrumbs?id=${encodeURIComponent(idOrPath)}`,
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

export const fetchLanguages = (
    idOrPath: string,
    draft = false
): Promise<Language[]> =>
    fetchWithTimeout(
        `${
            draft ? xpDraftServiceUrl : xpServiceUrl
        }/languages?id=${encodeURIComponent(idOrPath)}`,
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
    didRedirect: boolean = false,
    isDraft = false
): Promise<ContentTypeSchema> => {
    const content = await fetchContent(idOrPath, isDraft);

    const redirectTarget = getTargetIfRedirect(content);

    if (redirectTarget) {
        return fetchPage(redirectTarget, true, isDraft);
    }

    if (content && !contentToComponentMap[content.__typename]) {
        const path = content._path?.replace(enonicContentBasePath, '');
        const legacyContent = (await fetchLegacyHtml(path, isDraft).then(
            async (res) => {
                if (!res.ok) {
                    return makeErrorProps(path, res.statusText, res.status);
                }
                return {
                    ...content,
                    __typename: ContentType.Legacy,
                    data: { html: await res.text() },
                };
            }
        )) as ContentTypeSchema;

        return { ...legacyContent, didRedirect: didRedirect, isDraft: isDraft };
    }

    return content
        ? { ...content, didRedirect: didRedirect, isDraft: isDraft }
        : makeErrorProps(idOrPath, `Unknown fetch error from ${idOrPath}`);
};

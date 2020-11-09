import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import { makeErrorProps } from '../types/content-types/error-props';
import { contentToComponentMap } from '../components/ContentToComponentMapper';
import {
    enonicDraftLegacyPath,
    xpContentBasePath,
    enonicLegacyPath,
    enonicDraftServicePath,
    enonicServicePath,
} from './paths';
import { fetchWithTimeout } from './fetch-utils';
import { Breadcrumb } from '../types/breadcrumb';
import { NotificationProps } from '../types/content-types/notification-props';
import { Language } from '../types/languages';

const xpOrigin = process.env.XP_ORIGIN;
const xpServiceUrl = `${xpOrigin}${enonicServicePath}`;
const xpDraftServiceUrl = `${xpOrigin}${enonicDraftServicePath}`;
const xpLegacyUrl = `${xpOrigin}${enonicLegacyPath}`;
const xpLegacyDraftUrl = `${xpOrigin}${enonicDraftLegacyPath}`;

const fetchLegacyHtml = (path: string, draft = false) => {
    const url = `${draft ? xpLegacyDraftUrl : xpLegacyUrl}/${encodeURI(
        path[0] === '/' ? path.slice(1) : path
    )}`;
    console.log('fetching legacy html from:', url);
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
): Promise<ContentTypeSchema> => {
    const url = `${
        draft ? xpDraftServiceUrl : xpServiceUrl
    }/sitecontent?id=${encodeURIComponent(idOrPath)}`;
    console.log('fetching content from:', url);
    return fetchWithTimeout(url, 5000)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            const error = `Failed to fetch content from ${idOrPath}: ${res.statusText}`;
            return makeErrorProps(idOrPath, error, res.status);
        })
        .catch(console.error);
};

export const fetchNotifications = (
    path?: string,
    draft = false
): Promise<NotificationProps[]> => {
    const url = `${draft ? xpDraftServiceUrl : xpServiceUrl}/notifications${
        path ? `?path=${encodeURIComponent(path)}` : ''
    }`;
    return fetchWithTimeout(url, 5000)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            const error = `Failed to fetch notifications: ${res.statusText}`;
            console.log(error);
            return [];
        })
        .catch(console.error);
};

export const fetchBreadcrumbs = (
    idOrPath: string,
    draft = false
): Promise<Breadcrumb[]> => {
    const url = `${
        draft ? xpDraftServiceUrl : xpServiceUrl
    }/breadcrumbs?id=${encodeURIComponent(idOrPath)}`;
    return fetchWithTimeout(url, 5000)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            const error = `Failed to fetch breadcrumb from ${idOrPath}: ${res.statusText}`;
            console.log(error);
            return [];
        })
        .catch(console.error);
};

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
    isDraft = false,
    didRedirect: boolean = false
): Promise<ContentTypeSchema> => {
    const content = await fetchContent(idOrPath, isDraft);

    if (content && !contentToComponentMap[content.__typename]) {
        const path = content._path?.replace(xpContentBasePath, '');
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

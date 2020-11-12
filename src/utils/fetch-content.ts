import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import { makeErrorProps } from '../types/content-types/error-props';
import { contentToComponentMap } from '../components/ContentToComponentMapper';
import {
    xpContentBasePath,
    xpLegacyDraftUrl,
    xpLegacyUrl,
    xpServiceUrl,
} from './paths';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { Breadcrumb } from '../types/breadcrumb';
import { NotificationProps } from '../types/content-types/notification-props';
import { Language } from '../types/languages';

const fetchLegacyHtml = (path: string, isDraft = false) => {
    const url = `${isDraft ? xpLegacyDraftUrl : xpLegacyUrl}/${encodeURI(
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
    isDraft = false
): Promise<ContentTypeSchema> => {
    const params = objectToQueryString({
        ...(isDraft && { branch: 'draft' }),
        id: idOrPath,
    });
    const url = `${xpServiceUrl}/sitecontent${params}`;
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
    isDraft = false
): Promise<NotificationProps[]> => {
    const params = objectToQueryString({
        ...(isDraft && { branch: 'draft' }),
        ...(path && { path }),
    });
    const url = `${xpServiceUrl}/notifications${params}`;

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
    isDraft = false
): Promise<Breadcrumb[]> => {
    const params = objectToQueryString({
        ...(isDraft && { branch: 'draft' }),
        id: idOrPath,
    });
    const url = `${xpServiceUrl}/breadcrumbs${params}`;

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
    isDraft = false
): Promise<Language[]> => {
    const params = objectToQueryString({
        ...(isDraft && { branch: 'draft' }),
        id: idOrPath,
    });
    const url = `${xpServiceUrl}/languages${params}`;

    return fetchWithTimeout(url, 5000)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            const error = `Failed to fetch language from ${idOrPath}: ${res.statusText}`;
            console.log(error);
            return [];
        })
        .catch(console.error);
};

export const fetchPage = async (
    idOrPath: string,
    isDraft = false
): Promise<ContentTypeSchema> => {
    const content = await fetchContent(idOrPath, isDraft);

    if (content && !contentToComponentMap[content.__typename]) {
        const path = content._path?.replace(xpContentBasePath, '');

        return (await fetchLegacyHtml(path, isDraft).then(async (res) => {
            if (!res.ok) {
                return makeErrorProps(path, res.statusText, res.status);
            }
            return {
                ...content,
                __typename: ContentType.Legacy,
                data: { html: await res.text() },
            };
        })) as ContentTypeSchema;
    }

    return (
        content ||
        makeErrorProps(idOrPath, `Unknown fetch error from ${idOrPath}`)
    );
};

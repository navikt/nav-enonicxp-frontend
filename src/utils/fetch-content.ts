import { ContentProps } from '../types/content-props/_content-common';
import { makeErrorProps } from '../types/content-props/error-props';
import { xpServiceUrl } from './paths';
import { fetchWithTimeout, objectToQueryString } from './fetch-utils';
import { Breadcrumb } from '../types/breadcrumb';
import { NotificationProps } from '../types/notification-props';
import { LanguageSelectorProps } from '../types/language-selector-props';

const fetchContent = (
    idOrPath: string,
    isDraft = false,
    secret: string
): Promise<ContentProps> => {
    const params = objectToQueryString({
        ...(isDraft && { branch: 'draft' }),
        id: idOrPath,
    });
    const url = `${xpServiceUrl}/sitecontent${params}`;
    const config = { headers: { secret } };
    console.log('fetching content from:', url);

    return fetchWithTimeout(url, 5000, config)
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
): Promise<LanguageSelectorProps[]> => {
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
    isDraft = false,
    secret: string
): Promise<ContentProps> => {
    const content = await fetchContent(idOrPath, isDraft, secret);
    return content?.__typename
        ? { ...content, editMode: isDraft }
        : makeErrorProps(idOrPath, `Ukjent feil`, 500);
};

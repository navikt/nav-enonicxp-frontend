import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import { makeErrorProps } from '../types/content-types/error-props';
import { contentToComponentMap } from '../components/ContentToComponentMapper';
import { enonicContentBasePath, legacyPathPrefix } from './paths';

const xpServiceUrl = process.env.XP_SERVICE_URL;
const xpLegacyUrl = `${process.env.XP_ORIGIN}${legacyPathPrefix}`;
const decoratorUrl = process.env.DECORATOR_URL;

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

export const paramsObjectToQueryString = (params: object) =>
    Object.entries(params).reduce(
        (acc, [k, v], i) =>
            `${acc}${i ? '&' : '?'}${k}=${encodeURIComponent(
                JSON.stringify(v)
            )}`,
        ''
    );

const fetchWithTimeout = (url: string, timeout: number): Promise<any> =>
    Promise.race([
        fetch(url),
        new Promise((res) =>
            setTimeout(
                () =>
                    res({
                        ok: false,
                        status: 408,
                        statusText: 'Request Timeout',
                    }),
                timeout
            )
        ),
    ]);

export const fetchDecorator = (queryString?: string) => {
    const url = `${decoratorUrl}/${queryString ? queryString : ''}`;
    return fetchWithTimeout(url, 5000)
        .then((res) => {
            if (!res?.ok) {
                const error = `Failed to fetch decorator from ${url}: ${res.status} - ${res.statusText}`;
                throw Error(error);
            }
            return res.text();
        })
        .catch(console.error);
};

const fetchLegacyHtml = (path: string) => {
    const url = `${xpLegacyUrl}/${path[0] === '/' ? path.slice(1) : path}`;
    return fetchWithTimeout(url, 5000)
        .then((res) => {
            if (!res?.ok) {
                return {
                    ...res,
                    statusText: `Failed to fetch legacy html from ${path} at ${url}`,
                };
            }
            return res;
        })
        .catch(console.error);
};

const fetchContent = (idOrPath: string): Promise<ContentTypeSchema> =>
    fetchWithTimeout(
        `${xpServiceUrl}/sitecontent?id=${encodeURIComponent(idOrPath)}`,
        5000
    )
        .then((res) => {
            if (!res?.ok) {
                const error = `Failed to fetch content from ${idOrPath}: ${res.statusText}`;
                return makeErrorProps(idOrPath, error, res.status);
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

    if (content && !contentToComponentMap[content.__typename]) {
        const path = content._path?.replace(enonicContentBasePath, '');
        const legacyContent = (await fetchLegacyHtml(path).then(async (res) => {
            if (!res?.ok) {
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

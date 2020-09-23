import { ContentType, ContentTypeSchema } from '../types/content-types/_schema';
import { makeErrorProps } from '../types/content-types/error-props';
import { contentToComponentMap } from '../components/ContentToComponentMapper';
import { enonicContentBasePath } from './paths';

const xpServiceUrl = process.env.XP_SERVICE_URL;
const xpLegacyUrl = `${process.env.XP_ORIGIN}/_/service/legacy`;

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

const fetchLegacyHtml = (path: string) =>
    fetchWithTimeout(`${xpLegacyUrl}${encodeURI(path)}`, 5000).catch(
        console.error
    );

export const fetchContent = (idOrPath: string): Promise<ContentTypeSchema> =>
    fetchWithTimeout(
        `${xpServiceUrl}/sitecontent?id=${encodeURI(idOrPath)}`,
        5000
    )
        .then((res) => {
            if (!res?.ok) {
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

    if (content && !contentToComponentMap[content.__typename]) {
        const path = content._path?.replace(enonicContentBasePath, '');
        const legacyContent = (await fetchLegacyHtml(path).then(async (res) => {
            if (!res?.ok) {
                return makeErrorProps(path, 'Failed to fetch legacy html');
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
        : makeErrorProps(idOrPath, 'Unspecified error');
};

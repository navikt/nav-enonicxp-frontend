import { logger } from '@/shared/logger';
import { ContentProps } from 'types/content-props/_content-common';
import { Language } from 'translations';
import { pageLanguageToLayerLanguage } from './languages';

export const appOriginProd = 'https://www.nav.no';
export const xpContentPathPrefix = '/www.nav.no';
export const xpServicePath = '/_/service/no.nav.navno';
export const xpDraftPathPrefix = `/admin/site/preview/default/draft${xpContentPathPrefix}`;
export const editorPathPrefix = '/admin/tool/com.enonic.app.contentstudio/main/default/edit';

export const xpOrigin = process.env.XP_ORIGIN;
export const appOrigin = process.env.APP_ORIGIN;
export const adminOrigin = process.env.ADMIN_ORIGIN;

export const xpServiceUrl = `${xpOrigin}${xpServicePath}`;

const internalUrlPrefix = `^(${appOrigin}|${appOriginProd}|${adminOrigin})?(${xpContentPathPrefix}|${xpDraftPathPrefix})?`;

const internalUrlPrefixPattern = new RegExp(internalUrlPrefix, 'i');

const xpPathPrefixPattern = new RegExp(
    `^((${adminOrigin}${xpDraftPathPrefix})|(${xpContentPathPrefix}))`
);

// Links to these paths and any sub-paths will use SPA navigation.
// If any subpaths point to a separate app, insert an appropriate regex to ensure
// we don't show 404-errors on links from our app
const internalPaths = [
    '$',
    'no(?!\\/rss)', // rss-feed must be a full page load
    'en',
    'se',
    'nav.no',
    'skjemaer',
    'forsiden',
    'person\\/kontakt-oss(?!(\\/(nb|en))?\\/tilbakemeldinger)', // "tilbakemeldinger" is a separate app
];

const relativeAppUrlPattern = '^\\/(?!_\\/)'; // /_/* is used for Enonic XP services and assets
const absoluteAppUrlPattern = `^${internalUrlPrefix}($|\\/(${internalPaths.join('|')}))`;

// Matches both relative and absolute urls which points to any content internal to the app
const appUrlPattern = new RegExp(`(${absoluteAppUrlPattern})|(${relativeAppUrlPattern})`, 'i');
export const isAppUrl = (url: string) => !!(url && appUrlPattern.test(url));

// Matches urls which can be cached by next-image
const validImageUrlPattern = new RegExp(
    `^((${appOrigin}|${appOriginProd})?\\/)|((${xpOrigin})?(\\/_\\/))`,
    'i'
);
export const isValidImageUrl = (url: string) => url && validImageUrlPattern.test(url);

// Matches urls pointing directly to XP (/_/*)
const xpUrlPattern = new RegExp(`${internalUrlPrefix}/_`, 'i');
export const isXpUrl = (url: string) => url && xpUrlPattern.test(url);

export const isInternalUrl = (url: string) => url && (isAppUrl(url) || isXpUrl(url));

// Matches urls which should have the nofollow flag
const nofollowPattern = new RegExp(`^(${appOrigin})?(\\/sok($|\\?|\\/))`, 'i');
export const isNofollowUrl = (url: string) => nofollowPattern.test(url);

export const stripXpPathPrefix = (path: string) => path?.replace(xpPathPrefixPattern, '');

export const getInternalRelativePath = (url: string, isEditorView: boolean) => {
    const relativePath = url.replace(internalUrlPrefixPattern, '');

    if (isEditorView) {
        return `${xpDraftPathPrefix}${relativePath}`;
    }

    return relativePath || '/';
};

export const getRelativePathIfInternal = (url: string, isEditorView: boolean) => {
    if (!isInternalUrl(url)) {
        return url;
    }

    return getInternalRelativePath(url, isEditorView);
};

export const getInternalAbsoluteUrl = (url: string, isEditorView: boolean) => {
    if (!isInternalUrl(url)) {
        logger.info(`Warning: ${url} is not an internal url`);
        return url;
    }

    const internalPath = getInternalRelativePath(url, isEditorView);

    return `${isEditorView ? adminOrigin : appOrigin}${internalPath}`;
};

// Media url must always be absolute, to prevent internal nextjs routing loopbacks on redirects
export function getMediaUrl(url: string, isEditorView: boolean, language?: Language): string;
export function getMediaUrl(
    url: string | undefined,
    isEditorView: boolean,
    language?: Language
): string | undefined;
export function getMediaUrl(
    url: string | undefined,
    isEditorView: boolean,
    language: Language = 'no'
) {
    if (!url) {
        return undefined;
    }

    return transformToXpLayerUrl(url, isEditorView, language).replace(
        internalUrlPrefixPattern,
        isEditorView ? `${adminOrigin}${xpDraftPathPrefix}` : xpOrigin
    );
}

export const getPublicPathname = ({ _path }: Pick<ContentProps, '_path'>) =>
    stripXpPathPrefix(_path);

export const isUUID = (id: string) =>
    id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

export const sanitizeLegacyUrl = (url: string) =>
    url
        .toLowerCase()
        .replace(/\+|\s|( - )/g, '-')
        .replace(/,/g, '')
        .replace(/æ/g, 'ae')
        .replace(/ø/g, 'o')
        .replace(/å/g, 'a');

// Requests from content-studio can be either a path or UUID, we check for both
export const routerQueryToXpPathOrId = (routerQuery: string | string[]) => {
    const possibleId = typeof routerQuery === 'string' ? routerQuery : routerQuery[0];

    if (isUUID(possibleId)) {
        return possibleId;
    }

    const path = `/${typeof routerQuery === 'string' ? routerQuery : routerQuery.join('/')}`;

    return `${xpContentPathPrefix}${path}`;
};

// Direct links to XP assets or services should point to the appropriate layer for the specified language
// The /_/<language> repo mappings are defined in the vhost config on the XP servers
export const transformToXpLayerUrl = (url: string, isEditorView: boolean, language: Language) => {
    const path = getInternalRelativePath(url, isEditorView);
    const layer = pageLanguageToLayerLanguage[language];

    return layer ? path.replace(/^\/_/, `/_/${layer}`) : path;
};

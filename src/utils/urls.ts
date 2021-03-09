export const xpContentPathPrefix = '/www.nav.no';
export const xpServicePath = '/_/service/no.nav.navno';
export const xpDraftPathPrefix = '/admin/site/preview/default/draft/www.nav.no';

export const xpOrigin = process.env.XP_ORIGIN;
export const appOrigin = process.env.APP_ORIGIN;
export const adminOrigin = process.env.ADMIN_ORIGIN;

export const xpServiceUrl = `${xpOrigin}${xpServicePath}`;

export type XpContentRef = string;

const internalUrlPrefix = `^(${appOrigin})?(${xpContentPathPrefix})?`;

const internalUrlPrefixPattern = new RegExp(internalUrlPrefix, 'i');

// This pattern matches both relative and absolute urls which points to content internal to the app
const internalUrlPattern = new RegExp(
    `${internalUrlPrefix}($|\\/($|no|en|se|nav.no|skjemaer|forsiden|footer-contactus-no|footer-contactus-en|sykepenger-korona|beskjed))`,
    'i'
);

export const isInternalUrl = (url: string) =>
    url && internalUrlPattern.test(url);

// Matches urls which should have the nofollow flag
const nofollowPattern = new RegExp(`^(${appOrigin})?(\\/sok($|\\?|\\/))`, 'i');

export const isNofollowUrl = (url: string) => nofollowPattern.test(url);

export const stripXpPathPrefix = (path: string) =>
    path?.startsWith(xpContentPathPrefix)
        ? path.slice(xpContentPathPrefix.length)
        : path;

export const getInternalRelativePath = (url: string, isDraft?: boolean) => {
    const relativePath = url.replace(internalUrlPrefixPattern, '');

    if (isDraft) {
        return `${xpDraftPathPrefix}${relativePath}`;
    }

    return relativePath;
};

export const getRelativePathIfInternal = (url: string, isDraft?: boolean) => {
    if (!isInternalUrl(url)) {
        return url;
    }

    return getInternalRelativePath(url, isDraft);
};

export const getInternalAbsoluteUrl = (url: string, isDraft?: boolean) => {
    if (!isInternalUrl(url)) {
        console.log(`Warning: ${url} is not an internal url`);
        return url;
    }

    const internalPath = getInternalRelativePath(url, isDraft);

    return `${isDraft ? adminOrigin : appOrigin}${internalPath}`;
};

// Media url must always be absolute, to prevent internal routing loopback
export const getMediaUrl = (url: string, isDraft?: boolean) => {
    return url.replace(
        internalUrlPrefixPattern,
        isDraft ? adminOrigin : appOrigin
    );
};

export const isUUID = (id: string) =>
    id &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id
    );

export const sanitizeUrl = (url: string) =>
    url
        .toLowerCase()
        .replace(/\+|\s|( - )/g, '-')
        .replace(/,/g, '')
        .replace(/æ/g, 'ae')
        .replace(/ø/g, 'o')
        .replace(/å/g, 'a');

// Requests from content-studio can be either a path or UUID, we check for both
export const routerQueryToXpPathOrId = (routerQuery: string | string[]) => {
    const possibleId =
        typeof routerQuery === 'string'
            ? routerQuery
            : routerQuery[1] || routerQuery[0]; // checking the 1-index can be removed when PR#746 on the backend is in production

    if (isUUID(possibleId)) {
        return possibleId;
    }

    const path = `/${
        typeof routerQuery === 'string' ? routerQuery : routerQuery.join('/')
    }`;

    return `${xpContentPathPrefix}${path}`;
};

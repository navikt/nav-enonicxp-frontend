export const xpContentPathPrefix = '/www.nav.no';
export const xpServicePath = '/_/service/no.nav.navno';
export const xpDraftPathPrefix = '/admin/site/preview/default/draft/www.nav.no';

export const xpOrigin = process.env.XP_ORIGIN;
export const xpServiceUrl = `${xpOrigin}${xpServicePath}`;

export type XpContentRef = string;

export const getLocationOrigin = () =>
    process.env.APP_ORIGIN ||
    (typeof window !== 'undefined' && window.location.origin) ||
    '';

// This pattern matches both relative and absolute urls which points to content internal to the app
const internalUrlPattern = new RegExp(
    `^(${process.env.APP_ORIGIN})?($|\\/$|\\/no|\\/en|\\/se|\\/nav.no|\\/skjemaer|\\/forsiden|\\/footer-contactus-no|\\/footer-contactus-en|\\/sykepenger-korona|\\/beskjed)`,
    'i'
);

// Matches urls which should have the nofollow flag
const nofollowPattern = new RegExp(
    `^(${process.env.APP_ORIGIN})?(\\/sok($|\\?|\\/))`,
    'i'
);

export const insertDraftPrefixOnInternalUrl = (url: string) => {
    if (internalUrlPattern.test(url)) {
        return `${xpDraftPathPrefix}${url}`.replace(process.env.APP_ORIGIN, '');
    }

    return url;
};

// Checks if the string matches the pattern of the _path field of XP content objects
export const isXpPath = (path: string) => path?.startsWith(xpContentPathPrefix);

export const isInternalUrl = (url: string) =>
    isXpPath(url) || internalUrlPattern.test(url);

export const isNofollowUrl = (url: string) => nofollowPattern.test(url);

export const isUUID = (id: string) =>
    id &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id
    );

export const isNavUrl = (url: string) =>
    /^(https:\/\/)?([a-z0-9-]*(\.)?nav\.no)?(\/|$)/i.test(url);

export const xpPathToPathname = (path: string) =>
    isXpPath(path) ? path.slice(xpContentPathPrefix.length) : path;

export const xpPathToUrl = (path: string) =>
    `${getLocationOrigin()}${xpPathToPathname(path)}`;

export const pathnameToXpPath = (path: string) =>
    path && `${xpContentPathPrefix}${path}`;

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

    return pathnameToXpPath(path);
};

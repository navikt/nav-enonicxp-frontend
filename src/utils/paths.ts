export const xpContentPathPrefix = '/www.nav.no';
export const xpServicePath = '/_/service/no.nav.navno';

export const xpOrigin = process.env.XP_ORIGIN;
export const xpServiceUrl = `${xpOrigin}${xpServicePath}`;

export type XpContentRef = string;

export const getLocationOrigin = () =>
    process.env.APP_ORIGIN ||
    (typeof window !== 'undefined' && window.location.origin) ||
    '';

const internalUrlPattern = new RegExp(
    `^((${process.env.APP_ORIGIN}|(https?:\\/\\/)?nav.no)?)($|\\/$|\\/no|\\/en|\\/se|\\/nav.no|\\/skjemaer|\\/forsiden|\\/footer-contactus-no|\\/footer-contactus-en|\\/sykepenger-korona|\\/beskjed)`,
    'i'
);

// Checks if the string matches the pattern of the _path field of XP content objects
export const isXpPath = (path: string) => path?.startsWith(xpContentPathPrefix);

export const isInternalUrl = (url: string) =>
    isXpPath(url) || internalUrlPattern.test(url);

export const isUUID = (id: string) =>
    id &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id
    );

export const xpPathToAppPath = (path: string) =>
    isXpPath(path) ? path.slice(xpContentPathPrefix.length) : path;

export const xpPathToUrl = (path: string) =>
    `${getLocationOrigin()}${xpPathToAppPath(path)}`;

export const appPathToXpPath = (path: string) =>
    path && `${xpContentPathPrefix}${path}`;

export const routerQueryToXpPathOrId = (routerQuery: string | string[]) => {
    const possibleId =
        typeof routerQuery === 'string' ? routerQuery : routerQuery[1];

    if (isUUID(possibleId)) {
        return possibleId;
    }

    const path = `/${
        typeof routerQuery === 'string' ? routerQuery : routerQuery.join('/')
    }`;

    return `${xpContentPathPrefix}${path}`;
};

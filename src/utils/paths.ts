export const xpContentBasePath = '/www.nav.no';
export const localDraftPath = '/draft';
export const xpDraftPath = '/_/draft';
export const xpServicePath = '/_/service/no.nav.navno';
export const xpDraftServicePath = `${xpDraftPath}${xpServicePath}`;
export const xpLegacyPath = '/_/legacy';
export const xpDraftLegacyPath = '/_/legacy/draft';

export const xpOrigin = process.env.XP_ORIGIN;
export const xpServiceUrl = `${xpOrigin}${xpServicePath}`;
export const xpDraftServiceUrl = `${xpOrigin}${xpDraftServicePath}`;
export const xpLegacyUrl = `${xpOrigin}${xpLegacyPath}`;
export const xpLegacyDraftUrl = `${xpOrigin}${xpDraftLegacyPath}`;

export type XpContentRef = string;

export const getLocationOrigin = () =>
    process.env.APP_ORIGIN ||
    (typeof window !== 'undefined' && window.location.origin) ||
    '';

export const isXpPath = (path: string) =>
    /(www.*.nav.no|^nav.no|^)($|\/$|\/no|\/en|\/se|\/nav.no)/.test(path);

export const isUUID = (id: string) =>
    id &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id
    );

export const xpPathToAppPath = (path: string) =>
    isXpPath(path) ? path.split(xpContentBasePath).slice(-1)[0] : path;

export const xpPathToUrl = (path: string) =>
    `${getLocationOrigin()}${xpPathToAppPath(path)}`;

export const routerQueryToXpPathOrId = (routerQuery: string | string[]) => {
    const possibleId =
        typeof routerQuery === 'string' ? routerQuery : routerQuery[1];

    if (isUUID(possibleId)) {
        return possibleId;
    }

    const path = `/${
        typeof routerQuery === 'string' ? routerQuery : routerQuery.join('/')
    }`;

    return `${xpContentBasePath}${path}`;
};

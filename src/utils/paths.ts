export const xpContentBasePath = '/www.nav.no';
export const localDraftPath = '/draft';
export const enonicDraftPath = '/_/draft';
export const enonicServicePath = '/_/service/no.nav.navno';
export const enonicDraftServicePath = `${enonicDraftPath}${enonicServicePath}`;
export const enonicLegacyPath = '/_/legacy';
export const enonicDraftLegacyPath = '/_/legacy/draft';

export type EnonicContentRef = string;

export const getLocationOrigin = () =>
    process.env.APP_ORIGIN ||
    (typeof window !== 'undefined' && window.location.origin) ||
    '';

export const isEnonicPath = (path: string) =>
    /(www.*.nav.no|^nav.no|^)($|\/$|\/no|\/en|\/se|\/nav.no|\/sok($|[/?]))/.test(
        path
    );

export const isUUID = (id: string) =>
    id &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id
    );

export const enonicPathToAppPath = (path: string) =>
    isEnonicPath(path) ? path.split(xpContentBasePath).slice(-1)[0] : path;

export const enonicPathToUrl = (path: string) =>
    `${getLocationOrigin()}${enonicPathToAppPath(path)}`;

export const routerQueryToEnonicPathOrId = (routerQuery: string | string[]) => {
    const possibleId =
        typeof routerQuery === 'string' ? routerQuery : routerQuery[0];

    if (isUUID(possibleId)) {
        return possibleId;
    }

    const path = `/${
        typeof routerQuery === 'string' ? routerQuery : routerQuery.join('/')
    }`;

    return `${xpContentBasePath}${path}`;
};

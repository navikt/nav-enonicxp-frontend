export const enonicContentBasePath = '/www.nav.no';
export const legacyPathPrefix = '/_/service/legacy';

export type EnonicContentRef = string;

export const isEnonicPath = (path: string) =>
    /(www.*.nav.no|^nav.no|^)($|\/$|\/no|\/en|\/se|\/nav.no)/.test(path);

export const isUUID = (id: string) =>
    id &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        id
    );

export const enonicPathToAppPath = (path: string) =>
    isEnonicPath(path) ? path.split(enonicContentBasePath)[1] : null;

export const enonicPathToUrl = (path: string) =>
    isEnonicPath(path)
        ? `${process.env.APP_ORIGIN}${enonicPathToAppPath(path)}`
        : null;

export const routerQueryToEnonicPathOrId = (routerQuery: string | string[]) => {
    const possibleId =
        typeof routerQuery === 'string' ? routerQuery : routerQuery[0];

    if (isUUID(possibleId)) {
        return possibleId;
    }

    const path = `/${
        typeof routerQuery === 'string' ? routerQuery : routerQuery.join('/')
    }`;

    return `${enonicContentBasePath}${path}`;
};

export const enonicContentBasePath = '/www.nav.no';
export const legacyPathPrefix = '/_/service/legacy';

export type EnonicContentRef = string;

export const isEnonicPath = (path: string) =>
    /(www.*.nav.no|^nav.no|^)($|\/$|\/no|\/en|\/se|\/nav.no)/.test(path);

export const enonicPathToAppPath = (path: string) =>
    isEnonicPath(path) ? path.split(enonicContentBasePath)[1] : null;

export const enonicPathToUrl = (path: string) =>
    isEnonicPath(path)
        ? `${process.env.APP_ORIGIN}${enonicPathToAppPath(path)}`
        : null;

export const routerQueryToEnonicPath = (routerQuery: string | string[]) => {
    const queryPath = `/${
        typeof routerQuery === 'string' ? routerQuery : routerQuery.join('/')
    }`;

    return `${enonicContentBasePath}${queryPath}`;
};

export const enonicContentBasePath = '/www.nav.no';
export const legacyPathPrefix = '/_/service/legacy';

export type EnonicContentRef = string;

export const enonicPathToAppPath = (enonicPath: string) =>
    enonicPath.split(enonicContentBasePath)[1] || '';

export const enonicPathToUrl = (enonicPath: string) =>
    enonicPath
        ? `${process.env.APP_ORIGIN}${enonicPathToAppPath(enonicPath)}`
        : '#';

export const isEnonicPath = (path: string) =>
    /(nav.no|^)(\/no|\/en|\/se|\/nav.no)/.test(path);

export const routerQueryToEnonicPath = (routerQuery: string | string[]) => {
    const queryPath =
        typeof routerQuery === 'string' ? routerQuery : routerQuery.join('/');

    return `${enonicContentBasePath}/${queryPath}`;
};

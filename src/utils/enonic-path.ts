export const enonicContentBasePath = '/www.nav.no';

export type EnonicContentRef = string;

export const enonicPathToAppPath = (enonicPath: string) =>
    enonicPath.split(enonicContentBasePath)[1] || '';

export const isEnonicPath = (path: string) =>
    /(nav.no|^)(\/no|\/en|\/se|\/nav.no)/.test(path);

export const routerQueryToEnonicPath = (routerQuery: string | string[]) => {
    const queryPath =
        typeof routerQuery === 'string' ? routerQuery : routerQuery.join('/');

    return `${enonicContentBasePath}/${queryPath}`;
};

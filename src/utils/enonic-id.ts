import { prototypeBasePath, enonicBasePath } from './config';

export type EnonicId = string;

const isUUID = (id: string) =>
    RegExp(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    ).test(id);

const isEnonicPath = (path: string) => path.startsWith(enonicBasePath);

export const isEnonicId = (str: string) => isUUID(str);

export const appPathToEnonicPath = (pathName: string) =>
    `${enonicBasePath}${pathName.replace(prototypeBasePath, '')}`;

export const enonicPathToAppPath = (enonicPath: string) =>
    `${prototypeBasePath}${enonicPath.split(enonicBasePath)[1] || ''}`;

export const isNavnoPath = (path: string) =>
    /(nav.no|^)(\/no|\/en|\/se)/.test(path);

export const routerQueryToEnonicPath = (routerQuery: string | string[]) => {
    const queryPath =
        typeof routerQuery === 'string' ? routerQuery : routerQuery.join('/');

    return `${enonicBasePath}/${queryPath.replace(prototypeBasePath, '')}`;
};

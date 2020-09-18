export const prototypeBasePath = '/person/navno-frontend-prototype';
export const apiBasePath = `${prototypeBasePath}/api`;
export const enonicBasePath = '/www.nav.no';

export const getApiUrl = () => {
    return document.location.hostname === 'localhost'
        ? `http://localhost:8090${apiBasePath}`
        : `${document.location.origin}${apiBasePath}`;
};

export const getAppUrl = () => {
    return `${document.location.origin}${prototypeBasePath}`;
};

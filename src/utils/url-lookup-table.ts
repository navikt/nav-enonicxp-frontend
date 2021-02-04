import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const getUrlFromLookupTable = (path) => {
    let match = undefined;
    const lookupTable = publicRuntimeConfig?.runtimeConfig?.urlLookupTable;
    if (path && lookupTable) {
        Object.keys(lookupTable).some((key) => {
            if (path.startsWith(key)) {
                match = key;
                return true;
            }
            return false;
        });
    }
    return match ? path.replace(match, lookupTable[match]) : path;
};

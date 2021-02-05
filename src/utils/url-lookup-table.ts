export const getEnvUrl = (path: string) =>
    process.env.NAIS_ENV === 'prod' ? path : getUrlFromTable(path);

const getUrlFromTable = (path: string) => {
    let match = undefined;
    const lookupTable = JSON.parse(process.env.URL_LOOKUP_TABLE);
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

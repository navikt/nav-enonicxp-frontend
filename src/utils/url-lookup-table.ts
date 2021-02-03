import Cache from 'node-cache';

const oneHourInSeconds = 3600;
const oneMinuteInSeconds = 60;

const cacheKey = 'url-lookup-table-cache';
const cache = new Cache({
    stdTTL: oneHourInSeconds,
    checkperiod: oneMinuteInSeconds,
});

export const getUrlFromLookupTable = (path, lookupTable) => {
    let match = undefined;
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

export const getUrlLookupTable = async () =>
    cache.has(cacheKey)
        ? await cache.get(cacheKey)
        : await fetchUrlLookupTable();

export const fetchUrlLookupTable = async () => {
    console.log(`Fetching url-lookup-table from nav-enonicxp-iac`);
    const url = `https://raw.githubusercontent.com/navikt/nav-enonicxp-iac/master/url-lookup-tables/${process.env.NAIS_ENV}.json`;
    return await fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((table) => {
            cache.set(cacheKey, table);
            return table;
        })
        .catch((error) => {
            console.error(`Unable to fetch url-lookup-table: ${error}`);
        });
};

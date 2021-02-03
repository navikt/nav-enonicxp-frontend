export const getUrlFromLookupTable = (path, lookupTable) => {
    let match = undefined;
    if (lookupTable) {
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

export const fetchLookupTableFromApi = async () => {
    console.log(`Fetching url-lookup-table from nav-enonicxp-iac`);
    const url = `https://raw.githubusercontent.com/navikt/nav-enonicxp-iac/master/url-lookup-tables/${process.env.NAIS_ENV}.json`;
    return await fetch(url)
        .then((res) => res.json())
        .catch((error) =>
            console.error(`Unable to fetch url-lookup-table: ${error}`)
        );
};

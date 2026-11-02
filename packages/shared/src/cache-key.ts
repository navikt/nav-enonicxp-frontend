export const pathToCacheKey = (path: string) => (path === '/' ? '/index' : path);

// Next >= 16.4 keys render-cache entries by their source route, hashed:
//   /route-cache/<kind>/<sha256(sourceRoute)>/$<normalizePagePath(pathname)>
// The shared Valkey render cache must instead stay keyed by pathname only, because
// the external revalidator-proxy invalidates entries by pathname and cannot reproduce
// Next's hashing. This recovers the pathname (e.g. "/index", "/arbeidsgiver") from
// Next's internal key so stored and invalidated keys line up again.
export const renderCacheKeyToPathname = (renderCacheKey: string): string => {
    const separator = '/$';
    const separatorIndex = renderCacheKey.indexOf(separator);
    return separatorIndex === -1
        ? renderCacheKey
        : renderCacheKey.slice(separatorIndex + separator.length);
};

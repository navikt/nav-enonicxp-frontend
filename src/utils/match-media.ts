const noMatchMediaSupportFallback = {
    addEventListener: (_: string, __: (e: any) => void) => null,
    removeEventListener: (_: string, __: (e: any) => void) => null,
};

const matchMediaLegacy = (mql: MediaQueryList) => {
    if (!mql.addListener || !mql.removeListener) {
        return noMatchMediaSupportFallback;
    }

    mql.addEventListener = (
        _: string,
        callback: (e: MediaQueryListEvent) => void
    ) => mql.addListener(callback);
    mql.removeEventListener = (
        _: string,
        callback: (e: MediaQueryListEvent) => void
    ) => mql.removeListener(callback);
};

export const windowMatchMedia = (mediaQuery: string) => {
    if (typeof window === 'undefined' || !window.matchMedia) {
        return noMatchMediaSupportFallback;
    }

    console.log(`mql 1: ${typeof window.matchMedia}`)

    const mql = window.matchMedia(mediaQuery);

    console.log(`mql 2: ${typeof mql}`)

    if (!mql.addEventListener || !mql.removeEventListener) {
        return matchMediaLegacy(mql);
    }

    return mql;
};

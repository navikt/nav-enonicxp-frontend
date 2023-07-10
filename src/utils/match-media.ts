const noMatchMediaSupportFallback = {
    addEventListener: (_: string, __: (e: any) => void) => null,
    removeEventListener: (_: string, __: (e: any) => void) => null,
};

const matchMediaLegacy = (mql: MediaQueryList) => {
    if (!mql.addListener || !mql.removeListener) {
        return noMatchMediaSupportFallback;
    }

    // @ts-ignore
    mql.addEventListener = (
        _: string,
        callback: (e: MediaQueryListEvent) => void
    ) => mql.addListener(callback);

    // @ts-ignore
    mql.removeEventListener = (
        _: string,
        callback: (e: MediaQueryListEvent) => void
    ) => mql.removeListener(callback);

    return mql;
};

export const windowMatchMedia = (mediaQuery: string) => {
    if (typeof window === 'undefined' || !window.matchMedia) {
        return noMatchMediaSupportFallback;
    }

    const mql = window.matchMedia(mediaQuery);

    if (!mql.addEventListener || !mql.removeEventListener) {
        return matchMediaLegacy(mql);
    }

    return mql;
};

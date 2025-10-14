declare global {
    interface Window {
        dispatchEventActual?: Window['dispatchEvent'];
    }

    var cacheKey: string | undefined;
}

export {};

declare global {
    interface Window {
        dispatchEventActual?: Window['dispatchEvent'];
        // The CONFIG object is available on the parent window in content studio
        CONFIG?: {
            services?: {
                contentUrl?: string;
            };
        };
    }
}

export {};

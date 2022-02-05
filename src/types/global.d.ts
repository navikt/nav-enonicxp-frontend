declare global {
    interface Window {
        dispatchEventActual?: Window['dispatchEvent'];
    }
}

export {};

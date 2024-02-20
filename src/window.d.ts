declare global {
    interface Window {
        GoBrain?: {
            create: (element: HTMLElement, config: Record<string, any>) => any;
            destroy: (widgetId: string, deleteElement?: boolean) => any;
            widgets: (widgetId: string) => any;
        };
    }
}

export {};

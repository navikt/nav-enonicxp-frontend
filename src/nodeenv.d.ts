declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DOCKER_HOST_ADDRESS: string;
            ENV: 'prod' | 'dev1' | 'dev2' | 'localhost';
            ADMIN_ORIGIN: string;
            APP_ORIGIN: string;
            BUILD_ID: string;
            RELEASE_TAG: string;
            DECORATOR_URL: string;
            XP_ORIGIN: string;
            SERVICE_SECRET: string;
            REVALIDATOR_PROXY_ORIGIN: string;
            INNLOGGINGSSTATUS_URL: string;
            PAGE_CACHE_DIR: string;
            IMAGE_CACHE_DIR: string;
            FAILOVER_ORIGIN: string;
            IS_FAILOVER_INSTANCE: string;
            NAVNO_API_URL: string;
            ASSET_PREFIX: string;
        }
    }

    interface Window {
        GoBrain?: {
            create: (element: HTMLElement, config: Record<string, any>) => any;
            destroy: (widgetId: string, deleteElement?: boolean) => any;
            widgets: (widgetId: string) => any;
        };
    }

    var cacheKey: string | undefined;
}

export {};

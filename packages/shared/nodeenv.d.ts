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
            IMAGE_CACHE_DIR: string;
            FAILOVER_ORIGIN: string;
            IS_FAILOVER_INSTANCE: string;
            NAVNO_API_URL: string;
            NAVNO_SEARCH_API_URL: string;
            ASSET_PREFIX: string;
            TELEMETRY_URL: string;
            NEXT_PHASE: string;
            REDIS_URI_PAGECACHE: string;
            REDIS_USERNAME_PAGECACHE: string;
            REDIS_PASSWORD_PAGECACHE: string;
            DECORATOR_NOCACHE?: 'true' | 'false';
        }
    }

    const cacheKey: string | undefined;
}

export {};

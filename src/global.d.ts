declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DOCKER_HOST_ADDRESS: string;
            ENV: 'prod' | 'dev1' | 'dev2' | 'localhost';
            ADMIN_ORIGIN: string;
            APP_ORIGIN: string;
            BUILD_ID: string;
            DECORATOR_FALLBACK_URL: string;
            DECORATOR_LOCAL_PORT: string;
            XP_ORIGIN: string;
            SERVICE_SECRET: string;
            REVALIDATOR_PROXY_ORIGIN: string;
            INNLOGGINGSSTATUS_URL: string;
            PAGE_CACHE_DIR: string;
            IMAGE_CACHE_DIR: string;
            FAILOVER_ORIGIN: string;
            IS_FAILOVER_INSTANCE: string;
        }
    }
}

export {};

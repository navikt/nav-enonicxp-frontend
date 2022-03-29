declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            DOCKER_HOST_ADDRESS: string;
            ENV: string;
            ADMIN_ORIGIN: string;
            APP_ORIGIN: string;
            DECORATOR_FALLBACK_URL: string;
            DECORATOR_LOCAL_PORT: string;
            XP_ORIGIN: string;
            SERVICE_SECRET: string;
            REVALIDATOR_PROXY_ORIGIN: string;
            INNLOGGINGSSTATUS_URL: string;
            PAGE_CACHE_DIR: string;
            FAILOVER_ORIGIN: string;
            IS_FAILOVER_INSTANCE: string;
        }
    }
}

export {};

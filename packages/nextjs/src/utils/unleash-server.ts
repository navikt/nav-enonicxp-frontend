import { randomUUID } from 'crypto';
import { evaluateFlags, getDefinitions, flagsClient } from '@unleash/nextjs';
import { logger } from '@/shared/logger';
import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

const FLAG_CONFIG = {
    useLegacyNav: {
        unleashKey: 'use-legacy-navigation',
        defaultValue: true,
    },
} as const;

export type UnleashFlags = {
    [K in keyof typeof FLAG_CONFIG]: boolean;
};

export const DEFAULT_FLAGS: UnleashFlags = Object.fromEntries(
    Object.entries(FLAG_CONFIG).map(([key, config]) => [key, config.defaultValue])
) as UnleashFlags;

const isUnleashConfigured = () => {
    return Boolean(process.env.UNLEASH_SERVER_API_URL && process.env.UNLEASH_SERVER_API_TOKEN);
};

const COOKIE_NAME = 'unleash-session-id';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

const getOrCreateSessionId = (context: GetServerSidePropsContext | GetStaticPropsContext): string => {
    if (!('req' in context) || !context.req) {
        logger.info('No request context - using static-generation session ID');
        return 'static-generation';
    }

    const cookies = context.req.headers.cookie || '';
    const match = cookies.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
    const existingSessionId = match?.[1];

    if (existingSessionId) {
        return existingSessionId;
    }

    const newSessionId = randomUUID();

    if ('res' in context && context.res) {
        const cookieValue = `${COOKIE_NAME}=${newSessionId}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax`;
        const existingCookies = context.res.getHeader('Set-Cookie') || [];
        const cookiesArray = Array.isArray(existingCookies)
            ? existingCookies
            : [existingCookies.toString()];

        context.res.setHeader('Set-Cookie', [...cookiesArray, cookieValue]);
    } else {
        logger.warn(`Generated session ID ${newSessionId} but cannot set cookie (no response object - likely getStaticProps/ISR)`);
    }

    return newSessionId;
};

export const getUnleashFlags = async (
    context: GetServerSidePropsContext | GetStaticPropsContext
): Promise<UnleashFlags> => {
    if (!isUnleashConfigured()) {
        logger.info('Unleash not configured, using default flags');
        return DEFAULT_FLAGS;
    }

    try {
        const sessionId = getOrCreateSessionId(context);

        const definitions = await getDefinitions({
            fetchOptions: {
                next: { revalidate: 15 }, // Cache for 15 seconds
            },
        });

        const { toggles } = evaluateFlags(definitions, {
            sessionId,
        });

        const flags = flagsClient(toggles);
        const result = {} as Record<string, boolean>;
        for (const [key, config] of Object.entries(FLAG_CONFIG)) {
            result[key] = flags.isEnabled(config.unleashKey);
        }

        return result as UnleashFlags;
    } catch (error) {
        logger.error('Error fetching Unleash flags:', error);
        return DEFAULT_FLAGS;
    }
};

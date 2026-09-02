import { logger } from './logger';

// Acquires machine-to-machine Entra ID (Azure AD) access tokens via the Nais-injected token
// endpoint (Texas sidecar). See: https://docs.nais.io/auth/entra-id/how-to/consume-m2m/
//
// Texas already caches and refreshes tokens server-side and never returns an expired one, so
// there is no need to cache tokens again here - every call simply asks Texas for the token.

type EntraIdTokenResponse = {
    access_token: string;
    expires_in: number;
    token_type: string;
};

export const getEntraIdToken = async (target: string): Promise<string | null> => {
    const { NAIS_TOKEN_ENDPOINT } = process.env;

    if (!NAIS_TOKEN_ENDPOINT) {
        logger.error(
            `NAIS_TOKEN_ENDPOINT is not set - unable to acquire Entra ID token for target ${target}`
        );
        return null;
    }

    try {
        const response = await fetch(NAIS_TOKEN_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identity_provider: 'entra_id', target }),
        });

        if (!response.ok) {
            logger.error(
                `Failed to fetch Entra ID token for target ${target} - ${response.status} ${response.statusText}`
            );
            return null;
        }

        const { access_token: accessToken } = (await response.json()) as EntraIdTokenResponse;
        return accessToken || null;
    } catch (error) {
        logger.error(`Error while fetching Entra ID token for target ${target}`, { error });
        return null;
    }
};

const getAppTarget = (origin: string): string | null => {
    const { NAIS_CLUSTER_NAME } = process.env;

    if (!origin || !NAIS_CLUSTER_NAME) {
        logger.error(
            `Unable to determine Entra ID token target - origin or NAIS_CLUSTER_NAME is not set`
        );
        return null;
    }

    try {
        const appName = new URL(origin).hostname;
        return `api://${NAIS_CLUSTER_NAME}.navno.${appName}/.default`;
    } catch (error) {
        logger.error(`Failed to parse origin while building Entra ID target`, {
            error,
        });
        return null;
    }
};

// Acquires a token for calling nav-enonicxp-frontend-revalidator-proxy.
export const getRevalidatorProxyToken = async (): Promise<string | null> => {
    const target = getAppTarget(process.env.REVALIDATOR_PROXY_ORIGIN);
    return target ? getEntraIdToken(target) : null;
};

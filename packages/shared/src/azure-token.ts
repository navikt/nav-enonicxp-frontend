import { logger } from './logger';

// Acquires a machine-to-machine Entra ID (Azure AD) access token for calling
// nav-enonicxp-frontend-revalidator-proxy, via the Nais-injected token endpoint (Texas sidecar).
// See: https://docs.nais.io/auth/entra-id/how-to/consume-m2m/
//
// Texas already caches and refreshes the token server-side and never returns an expired one, so
// there is no need to cache the token again here - every call simply asks Texas for the token.

type EntraIdTokenResponse = {
    access_token: string;
    expires_in: number;
    token_type: string;
};

const getRevalidatorProxyTokenTarget = (): string | null => {
    const { REVALIDATOR_PROXY_ORIGIN, NAIS_CLUSTER_NAME } = process.env;

    if (!REVALIDATOR_PROXY_ORIGIN || !NAIS_CLUSTER_NAME) {
        logger.error(
            'Unable to determine Entra ID token target for revalidator-proxy - REVALIDATOR_PROXY_ORIGIN or NAIS_CLUSTER_NAME is not set'
        );
        return null;
    }

    try {
        const appName = new URL(REVALIDATOR_PROXY_ORIGIN).hostname;
        return `api://${NAIS_CLUSTER_NAME}.navno.${appName}/.default`;
    } catch (error) {
        logger.error('Failed to parse REVALIDATOR_PROXY_ORIGIN while building Entra ID target', {
            error,
        });
        return null;
    }
};

export const getRevalidatorProxyToken = async (): Promise<string | null> => {
    const { NAIS_TOKEN_ENDPOINT } = process.env;

    if (!NAIS_TOKEN_ENDPOINT) {
        logger.error(
            'NAIS_TOKEN_ENDPOINT is not set - unable to acquire Entra ID token for revalidator-proxy requests'
        );
        return null;
    }

    const target = getRevalidatorProxyTokenTarget();
    if (!target) {
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
                `Failed to fetch Entra ID token for revalidator-proxy - ${response.status} ${response.statusText}`
            );
            return null;
        }

        const { access_token: accessToken } = (await response.json()) as EntraIdTokenResponse;
        return accessToken || null;
    } catch (error) {
        logger.error('Error while fetching Entra ID token for revalidator-proxy', { error });
        return null;
    }
};

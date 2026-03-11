// Sends periodic heartbeat signals to an internal app which proxies revalidation
// requests from Enonic XP to all frontend pods
// See: https://github.com/navikt/nav-enonicxp-frontend-revalidator-proxy
import { networkInterfaces } from 'os';
import { logger } from '@/shared/logger';
import { objectToQueryString } from '@/shared/fetch-utils';
import { redisCache } from 'cache/page-cache-handler';

const { ENV, NODE_ENV, DOCKER_HOST_ADDRESS, REVALIDATOR_PROXY_ORIGIN, SERVICE_SECRET } =
    process.env;

const HEARTBEAT_PERIOD_MS = 5000;

const MAX_CONSECUTIVE_FAILURES = 10;

let didStart = false;

const getPodAddress = () => {
    if (ENV === 'localhost') {
        // If the revalidator-proxy app is running in a docker container, you need to
        // set DOCKER_HOST_ADDRESS to a host address reachable from your docker network
        return DOCKER_HOST_ADDRESS || 'localhost';
    }

    const nets = networkInterfaces();
    const podAddress = nets?.eth0?.[0]?.address;

    if (!podAddress) {
        logger.error('Error: pod IP address could not be determined!');
        return null;
    }

    return podAddress;
};

const getProxyLivenessUrl = () => {
    const podAddress = getPodAddress();
    return podAddress
        ? `${REVALIDATOR_PROXY_ORIGIN}/liveness${objectToQueryString({
              address: podAddress,
              redisPrefixes: redisCache.getKeyPrefixes().join(','),
          })}`
        : null;
};

export const initRevalidatorProxyHeartbeat = () => {
    if (NODE_ENV === 'development') {
        return;
    }

    if (didStart) {
        logger.warn('Proxy heartbeat loop already started!');
        return;
    }

    didStart = true;

    logger.info('Starting heartbeat loop');

    let consecutiveFailures = 0;

    const heartbeatFunc = async () => {
        const url = getProxyLivenessUrl();
        if (!url) {
            logger.error('Failed to determine revalidator heartbeat url!');
            return;
        }

        logger.info(`Revalidtor: heartbeat url: ${url}`);

        try {
            const res = await fetch(url, {
                headers: { secret: SERVICE_SECRET },
            });

            if (res.ok) {
                consecutiveFailures = 0;
                return;
            }

            consecutiveFailures++;
            if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
                logger.error(
                    `Heartbeat failed ${consecutiveFailures} consecutive times (last status: ${res.status})`
                );
            }
        } catch (error) {
            consecutiveFailures++;
            if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
                logger.error(`Heartbeat failed ${consecutiveFailures} consecutive times`, {
                    error,
                });
            }
        }
    };

    heartbeatFunc();
    setInterval(heartbeatFunc, HEARTBEAT_PERIOD_MS);
};

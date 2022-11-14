// Sends periodic heartbeat signals to an internal app which proxies revalidation
// requests from Enonic XP to all frontend pods
// See: https://github.com/navikt/nav-enonicxp-frontend-revalidator-proxy
import fetch from 'node-fetch';
import { networkInterfaces } from 'os';

const {
    ENV,
    NODE_ENV,
    DOCKER_HOST_ADDRESS,
    REVALIDATOR_PROXY_ORIGIN,
    SERVICE_SECRET,
} = process.env;
const heartbeatPeriodMs = 5000;

const getPodAddress = () => {
    if (ENV === 'localhost') {
        // If the revalidator-proxy app is running in a docker container, you need to
        // set DOCKER_HOST_ADDRESS to a host address reachable from your docker network
        return DOCKER_HOST_ADDRESS || 'localhost';
    }

    const nets = networkInterfaces();
    const podAddress = nets?.eth0?.[0]?.address;

    if (!podAddress) {
        console.error(
            'Error: pod IP address could not be determined' +
                ' - Event driven cache regeneration will not be active for this instance'
        );
        return null;
    }

    return podAddress;
};

const getProxyLivenessUrl = () => {
    const podAddress = getPodAddress();
    return podAddress
        ? `${REVALIDATOR_PROXY_ORIGIN}/liveness?address=${podAddress}`
        : null;
};

export const initRevalidatorProxyHeartbeat = (() => {
    if (NODE_ENV === 'development') {
        return () => {};
    }

    let heartbeatInterval: NodeJS.Timer;
    const url = getProxyLivenessUrl();

    return () => {
        if (!heartbeatInterval && url) {
            console.log('Starting heartbeat loop');
            const heartbeatFunc = () =>
                fetch(url, {
                    headers: { secret: SERVICE_SECRET },
                }).catch((e) =>
                    console.error(`Failed to send heartbeat signal - ${e}`)
                );
            heartbeatFunc();
            heartbeatInterval = setInterval(heartbeatFunc, heartbeatPeriodMs);
        }
    };
})();

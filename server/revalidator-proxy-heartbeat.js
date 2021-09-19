// Sends periodic heartbeat signals to an internal app which proxies revalidation
// requests from Enonic XP to all frontend pods
// See: https://github.com/navikt/nav-enonicxp-frontend-revalidator-proxy
const fetch = require('node-fetch');
const { networkInterfaces } = require('os');

const { NODE_ENV, REVALIDATOR_PROXY_ORIGIN, SERVICE_SECRET } = process.env;
const heartbeatPeriodMs = 5000;

const getPodAddress = () => {
    const nets = networkInterfaces();
    const podAddress = nets?.eth0?.[0]?.address;

    if (!podAddress) {
        const isLocal = REVALIDATOR_PROXY_ORIGIN.includes('localhost');
        if (isLocal) {
            return process.env.USE_LOCAL_REVALIDATOR
                ? 'localhost'
                : 'host.docker.internal';
        }

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

const initHeartbeat = () => {
    let heartbeatInterval;
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
};

const noop = () => {};

exports.initHeartbeat = NODE_ENV === 'production' ? initHeartbeat() : noop;

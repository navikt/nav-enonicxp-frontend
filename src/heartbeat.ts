// Sends a heartbeat signal to an internal app which proxies revalidation from
// Enonic XP to all frontend pods
// See: https://github.com/navikt/nav-enonicxp-frontend-revalidator-proxy

import { networkInterfaces } from 'os';

const { NODE_ENV, REVALIDATOR_PROXY_ORIGIN } = process.env;
const heartbeatPeriodMs = 5000;

const getPodAddress = () => {
    const nets = networkInterfaces();
    const podAddress =
        (nets.eth0 && nets.eth0[0] && nets.eth0[0].address) || 'localhost';

    if (podAddress === 'localhost' && NODE_ENV === 'production') {
        console.log('Warning: pod IP could not be determined');
    }

    return podAddress;
};

const revalidatorProxyHeartbeatUrl = `${REVALIDATOR_PROXY_ORIGIN}/heartbeat?address=${getPodAddress()}`;

const sendHeartbeat = () =>
    Promise.race([
        fetch(revalidatorProxyHeartbeatUrl),
        new Promise((res) =>
            setTimeout(
                () =>
                    res({
                        ok: false,
                        status: 408,
                        statusText: 'Request Timeout',
                    }),
                1000
            )
        ),
    ]);

const noop = () => {};

export const startHeartbeat =
    NODE_ENV === 'production'
        ? (() => {
              let heartbeatIntervalTimer;

              return () => {
                  if (!heartbeatIntervalTimer) {
                      console.log('Starting heartbeat loop');
                      heartbeatIntervalTimer = setInterval(() => {
                          console.log('Sending heartbeat');
                          sendHeartbeat();
                      }, heartbeatPeriodMs);
                  }
              };
          })()
        : noop;

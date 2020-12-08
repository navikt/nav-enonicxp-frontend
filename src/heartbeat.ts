import { networkInterfaces } from 'os';

const { NODE_ENV } = process.env;
export const revalidatorProxyOrigin =
    NODE_ENV === 'production'
        ? 'nav-enonicxp-frontend-revalidator-proxy'
        : 'localhost:3002';

const heartbeatPeriodMs = 5000;

const nets = networkInterfaces();
const podAddress =
    (nets.eth0 && nets.eth0[0] && nets.eth0[0].address) || 'localhost';

if (podAddress === 'localhost' && NODE_ENV === 'production') {
    console.log('Warning: pod IP could not be determined');
}

const revalidatorProxyHeartbeatUrl = `http://${revalidatorProxyOrigin}/heartbeat?address=${podAddress}`;

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

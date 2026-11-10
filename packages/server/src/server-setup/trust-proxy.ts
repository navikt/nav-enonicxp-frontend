import { Express } from 'express';

// The TRUSTED_PROXIES array works by providing all the IPs we *know* are internal
// The trust-proxy function will compare the X-Forwarded-For header against these
// and stop at the first IP it hits we don't have in this array.
//
// The X-Forwarded-For header itself gets set/appended by the Ingress and forwarded by Linkerd
// (It's appended instead of set if the user tried to set their own header,
// but trust-proxy will only trust the most 'recent' member of that header, which is what the ingress sets)
//
// In front of the ingress sits a Google load balancer (GFE), which appends both the client
// and its own address, so in dev the header looks like "<client>, 35.191.x.x". The GFE address
// is public, so without its ranges here req.ip would stop at the load balancer.
// Ranges: https://cloud.google.com/load-balancing/docs/firewall-rules

// So all these are basically just 'stuff we trust in our cluster' + Google's load balancers
export const TRUSTED_PROXIES = [
    'loopback',
    'linklocal',
    'uniquelocal',
    '100.64.0.0/10',
    // Google load balancer (GFE) proxy ranges
    '35.191.0.0/16',
    '130.211.0.0/22',
    '2600:2d00:1:1::/64',
];

export const configureTrustProxy = (expressApp: Express) => {
    expressApp.set('trust proxy', TRUSTED_PROXIES);
};

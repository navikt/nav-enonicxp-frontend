import { Express } from 'express';

// The TRUSTED_PROXIES array works by providing all the IPs we *know* are internal
// The trust-proxy function will compare the X-Forwarded-For header against these
// and stop at the first IP it hits we don't have in this array.
//
// The X-Forwarded-For header itself gets set/appended by the Ingress and forwarded by Linkerd
// (It's appended instead of set if the user tried to set their own header,
// but trust-proxy will only trust the most 'recent' member of that header, which is what the ingress sets)

// So all these are basically just 'stuff we trust in our cluster'
export const TRUSTED_PROXIES = ['loopback', 'linklocal', 'uniquelocal', '100.64.0.0/10'];

export const configureTrustProxy = (expressApp: Express) => {
    expressApp.set('trust proxy', TRUSTED_PROXIES);
};

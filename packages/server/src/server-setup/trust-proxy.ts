import { Express } from 'express';
import { trustProxy } from '@navikt/client-ip/express';

// Lets req.ip resolve to the client's address instead of the closest proxy.
//
// @navikt/client-ip knows the proxies in front of Nais apps on GCP (in-cluster addresses,
// Google's load balancers and BigIP). Express walks X-Forwarded-For from the right and
// stops at the first address that isn't one of those, so entries the client sent itself
// are ignored.
export const configureTrustProxy = (expressApp: Express) => {
    expressApp.set('trust proxy', trustProxy);
};

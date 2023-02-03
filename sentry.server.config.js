import * as Sentry from '@sentry/nextjs';
import { CaptureConsole } from '@sentry/integrations';

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.1,
    environment: process.env.ENV,
    release: process.env.RELEASE_TAG,
    integrations: [new CaptureConsole({ levels: ['error'] })],
    enabled: process.env.ENV !== 'localhost',
});

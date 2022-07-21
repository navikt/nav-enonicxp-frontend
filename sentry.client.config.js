import * as Sentry from '@sentry/nextjs';
import { CaptureConsole } from '@sentry/integrations';

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.ENV,
    integrations: [new CaptureConsole()],
});

import Sentry from '@sentry/nextjs';
import { CaptureConsole } from '@sentry/integrations';

Sentry.init({
    dsn: 'https://7d6de132401448989071436f6e54c748@sentry.gc.nav.no/131',
    tracesSampleRate: 1.0,
    environment: process.env.ENV,
    integrations: [new CaptureConsole()],
});

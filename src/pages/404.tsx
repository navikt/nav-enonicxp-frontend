import React, { useEffect } from 'react';
import { make404Props } from 'utils/make-error-props';
import { PageBase } from 'components/PageBase';
import { useRouter } from 'next/router';
import * as Sentry from '@sentry/react';

export const ErrorPage404 = () => {
    const props = make404Props();
    const router = useRouter();

    useEffect(() => {
        // If the 404 is triggered client-side, the pathname will refer to the
        // next.js page route. Client-side 404 can sometimes be a result of badly formed
        // links to external apps, so we do a full reload to ensure such links will resolve
        // anyway.
        if (router.pathname !== '/404') {
            Sentry.captureMessage(
                `Client-side 404 error on path: ${router.asPath}`,
                'error'
            );
            window.location.reload();
        }
    }, []);

    return <PageBase content={props} />;
};

export default ErrorPage404;

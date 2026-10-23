import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/compat/router';
import { logger } from '@/shared/logger';
import { make404Props } from 'utils/make-error-props';
import { PageBase } from 'components/PageBase';
import Config from 'config';

const loopDetectionParam = 'error';

const isFailover = process.env.IS_FAILOVER_INSTANCE === 'true';

// Without revalidate the 404 page is generated only at build time, which freezes the
// decorator version until the next deploy. With ISR it goes through the page cache handler,
// which is invalidated when the decorator version changes.
export const getStaticProps: GetStaticProps = () => {
    return isFailover ? { props: {} } : { props: {}, revalidate: Config.vars.revalidatePeriod };
};

export const ErrorPage404 = () => {
    const props = make404Props();
    const router = useRouter();

    useEffect(() => {
        // If the 404 is triggered client-side, the pathname will refer to the
        // next.js page route. Client-side 404 can sometimes be a result of badly formed
        // links to external apps, so we do a full reload to ensure such links will resolve
        // anyway.

        if (!router) {
            return;
        }

        if (router.pathname !== '/404' && !window.location.search.includes(loopDetectionParam)) {
            logger.error(`Client-side 404 error on path: ${router.asPath}`);
            window.location.replace(
                `${window.location.origin}${window.location.pathname}?${loopDetectionParam}`
            );
        }
    }, [router]);

    return <PageBase content={props} />;
};

export default ErrorPage404;

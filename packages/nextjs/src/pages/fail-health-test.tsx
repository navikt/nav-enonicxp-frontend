// --- TEMPORARY: Health failure simulation trigger ---
// Visit /fail-health-test in a dev environment to trigger health failure on this pod.
// The pod will become unhealthy and Kubernetes will kill it.
// Remove this file when testing is complete.

import { GetServerSideProps } from 'next';
import { logger } from '@/shared/logger';
import {
    isHealthFailureSimulationEnabled,
    triggerHealthFailure,
} from 'utils/health-failure-simulation';

type Props = {
    triggered: boolean;
    ttlSeconds?: number;
    error?: string;
};

const FailHealthTest = ({ triggered, ttlSeconds, error }: Props) => {
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div>
            <h1>Health failure {triggered ? 'triggered' : 'not triggered'}</h1>
            {triggered && (
                <p>
                    This pod will become unhealthy while the simulation is active (about{' '}
                    {ttlSeconds || 0} seconds) and Kubernetes will restart it.
                </p>
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    if (!isHealthFailureSimulationEnabled()) {
        return { notFound: true };
    }

    if (context.query.confirm !== 'true') {
        return {
            props: { triggered: false, error: 'Add ?confirm=true to trigger health failure' },
        };
    }

    const ttlMs = triggerHealthFailure();
    logger.warn('Health failure simulation triggered', {
        metaData: { env: process.env.ENV, path: context.resolvedUrl || context.req.url, ttlMs },
    });

    return {
        props: { triggered: true, ttlSeconds: Math.round(ttlMs / 1000) },
    };
};

export default FailHealthTest;

// --- TEMPORARY: Health failure simulation trigger ---
// Visit /fail-health-test in a dev environment to trigger health failure on this pod.
// The pod will become unhealthy and Kubernetes will kill it.
// Remove this file when testing is complete.

import { GetServerSideProps } from 'next';
import { logger } from '@/shared/logger';
import {
    isHealthFailureSimulationEnabled,
    triggerProcessCrash,
    triggerHealthFailure,
} from 'utils/health-failure-simulation';

type Props = {
    healthTriggered: boolean;
    crashTriggered: boolean;
    ttlSeconds: number;
    error?: string;
};

const FailHealthTest = ({ healthTriggered, crashTriggered, ttlSeconds, error }: Props) => {
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Failure simulation triggered</h1>
            {healthTriggered && (
                <p>
                    This pod will become unhealthy while the simulation is active (about{' '}
                    {ttlSeconds} seconds) and Kubernetes will restart it.
                </p>
            )}
            {crashTriggered && (
                <p>An uncaught exception is scheduled and this process will be shut down.</p>
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    if (!isHealthFailureSimulationEnabled()) {
        return { notFound: true };
    }

    const health = context.query.health === 'true';
    const crash = context.query.crash === 'true';

    if (!health && !crash) {
        return {
            props: {
                healthTriggered: false,
                crashTriggered: false,
                ttlSeconds: 0,
                error: 'Use ?health=true and/or ?crash=true',
            },
        };
    }

    let ttlMs = 0;

    if (health) {
        ttlMs = triggerHealthFailure();
        logger.warn('Health failure simulation triggered', {
            metaData: { env: process.env.ENV, path: context.resolvedUrl || context.req.url, ttlMs },
        });
    }

    if (crash) {
        logger.warn('Process crash simulation triggered', {
            metaData: { env: process.env.ENV, path: context.resolvedUrl || context.req.url },
        });
        triggerProcessCrash();
    }

    return {
        props: {
            healthTriggered: health,
            crashTriggered: crash,
            ttlSeconds: Math.round(ttlMs / 1000),
        },
    };
};

export default FailHealthTest;

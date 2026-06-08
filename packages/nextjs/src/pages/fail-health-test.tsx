// --- TEMPORARY: Health failure simulation trigger ---
// Visit /fail-health-test in a dev environment to trigger health failure on this pod.
// The pod will become unhealthy and Kubernetes will kill it.
// Remove this file when testing is complete.

import { GetServerSideProps } from 'next';
import { triggerHealthFailure } from 'utils/health-failure-simulation';

type Props = {
    triggered: boolean;
    error?: string;
};

const FailHealthTest = ({ triggered, error }: Props) => {
    if (error) {
        return <div>{error}</div>;
    }
    return (
        <div>
            <h1>Health failure {triggered ? 'triggered' : 'not triggered'}</h1>
            {triggered && (
                <p>
                    This pod will become unhealthy within ~30 seconds and Kubernetes will restart
                    it.
                </p>
            )}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    if (context.query.confirm !== 'true') {
        return {
            props: { triggered: false, error: 'Add ?confirm=true to trigger health failure' },
        };
    }

    triggerHealthFailure();

    return {
        props: { triggered: true },
    };
};

export default FailHealthTest;

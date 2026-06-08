import { GetServerSideProps } from 'next';
import { isHealthFailureSimulated } from 'utils/health-failure-simulation';

type HealthRenderProps = {
    timestamp: number;
};

const HealthRender = ({ timestamp }: HealthRenderProps) => {
    return <div data-health-render={timestamp}>ok</div>;
};

export const getServerSideProps: GetServerSideProps<HealthRenderProps> = async () => {
    // --- TEMPORARY: Health failure simulation ---
    if (isHealthFailureSimulated()) {
        throw new Error('Simulated health failure (failHealth triggered)');
    }
    // --- END TEMPORARY ---

    return {
        props: {
            timestamp: Date.now(),
        },
    };
};

export default HealthRender;

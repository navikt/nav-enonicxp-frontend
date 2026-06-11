import { GetServerSideProps } from 'next';

type HealthRenderProps = {
    timestamp: number;
};

const HealthRender = ({ timestamp }: HealthRenderProps) => {
    return (
        <div data-health-render={timestamp} style={{ display: 'none' }}>
            {timestamp}
        </div>
    );
};

// Used by the health monitor to check if the server is healthy. Should return 200 if healthy, 5** if not.
// The getServerSideProps simulates a server-side rendering process, ensuring that the servers renderabilty
// is also checked by the health monitor.
export const getServerSideProps: GetServerSideProps<HealthRenderProps> = async () => {
    return {
        props: {
            timestamp: Date.now(),
        },
    };
};

export default HealthRender;

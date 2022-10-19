import { PageBase } from 'components/PageBase';
import { getStaticProps as getStaticPropsMaster } from 'pages/[...pathRouter]';
import { GetStaticProps } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';

const isDevBuild =
    process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD &&
    process.env.ENV !== 'prod';

// The build workflow on GHA does not have access to our dev-backend, so we just return not found for this page on build
const getStaticPropsBuildDev: GetStaticProps = async () => {
    return {
        notFound: true,
    };
};

export const getStaticProps = isDevBuild
    ? getStaticPropsBuildDev
    : getStaticPropsMaster;

export default PageBase;

// We define a separate page for the index, as the next.js ISR cache does not seem to handle the revalidate period
// correctly for the index in optional catch-all routes

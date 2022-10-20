import { PageBase } from 'components/PageBase';
import { GetStaticProps } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { fetchPageProps } from 'utils/fetch/fetch-page-props';
import Config from 'config';

const isDevBuild =
    process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD &&
    (process.env.ENV === 'dev1' || process.env.ENV === 'dev2');

// The build workflow on GHA does not have access to our dev-backend, so we just return not found for this page on build
const getStaticPropsBuildDev: GetStaticProps = async () => {
    return {
        notFound: true,
    };
};

const getStaticPropsNormal: GetStaticProps = async () => {
    console.log('Fetching index page props');

    const pageProps = await fetchPageProps({
        routerQuery: '',
    });

    return {
        ...pageProps,
        revalidate: Config.vars.revalidatePeriod,
    };
};

export const getStaticProps = isDevBuild
    ? getStaticPropsBuildDev
    : getStaticPropsNormal;

export default PageBase;

// We define a separate page for the index, as the next.js ISR cache does not seem to handle the revalidate period
// correctly for the index in optional catch-all routes

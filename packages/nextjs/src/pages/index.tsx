import { GetStaticProps } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { logger } from '@/shared/logger';
import { PageBase } from 'components/PageBase';
import { fetchPageProps } from 'utils/fetch/fetch-page-props';
import Config from 'config';

const isFailover = process.env.IS_FAILOVER_INSTANCE === 'true';

const isDevBuild =
    process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD && !isFailover && process.env.ENV !== 'prod';

// The build workflow on GHA does not have access to our dev-backend, so we just return not found for this page on build
const getStaticPropsBuildDev: GetStaticProps = async () => {
    return {
        notFound: true,
    };
};

const getStaticPropsNormal: GetStaticProps = async () => {
    logger.info('Fetching index page props');

    const pageProps = await fetchPageProps({
        routerQuery: '',
    });

    if (isFailover) {
        (pageProps.props as any).content.isFailover = true;
        return pageProps;
    }

    return {
        ...pageProps,
        revalidate: Config.vars.revalidatePeriod,
    };
};

export const getStaticProps = isDevBuild ? getStaticPropsBuildDev : getStaticPropsNormal;

export default PageBase;

// We define a separate page for the index, as the next.js ISR cache does not seem to handle the revalidate period
// correctly for the index in optional catch-all routes

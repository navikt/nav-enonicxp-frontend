import { GetStaticPaths, GetStaticProps } from 'next';
import { logger } from '@/shared/logger';
import { PageBase } from 'components/PageBase';
import Config from 'config';
import { fetchPageProps } from 'utils/fetch/fetch-page-props';
import { isPropsWithContent } from 'types/_type-guards';
import { fetchPrerenderPaths } from 'utils/fetch/fetch-prerender-paths';

// For failover deployments we fully prerender a static version of the site
// during build-time. For regular app deployments we generate pages on demand
// with incremental regeneration
const isFailover = process.env.IS_FAILOVER_INSTANCE === 'true';

const getStaticPropsFailover: GetStaticProps = async (context) => {
    try {
        const pageProps = await fetchPageProps({
            routerQuery: context?.params?.pathRouter,
            noRedirect: true,
        });

        if (isPropsWithContent(pageProps.props)) {
            pageProps.props.content.isFailover = true;
        }

        return pageProps;
    } catch (error) {
        logger.error('Error fetching page props in failover mode:', error);
        return {
            notFound: true,
        };
    }
};

const getStaticPathsFailover = async () => {
    const contentPaths = await fetchPrerenderPaths();

    if (!contentPaths) {
        const msg = 'Could not retrieve paths to prerender, aborting...';
        logger.error(msg);
        throw new Error(msg);
    }

    return {
        paths: contentPaths,
        fallback: false,
    };
};

const getStaticPropsRegular: GetStaticProps = async (context) => {
    const pageProps = await fetchPageProps({
        routerQuery: context?.params?.pathRouter,
    });

    return {
        ...pageProps,
        revalidate: Config.vars.revalidatePeriod,
    };
};

const getStaticPathsRegular: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticProps = isFailover ? getStaticPropsFailover : getStaticPropsRegular;

export const getStaticPaths = isFailover ? getStaticPathsFailover : getStaticPathsRegular;

export default PageBase;

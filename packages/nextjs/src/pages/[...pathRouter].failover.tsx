import { GetStaticProps } from 'next';
import { logger } from '@/shared/logger';
import { isPropsWithContent } from 'types/_type-guards';
import { fetchPrerenderPaths } from 'utils/fetch/fetch-prerender-paths';
import { fetchPageProps } from 'utils/fetch/fetch-page-props';
import { PageBase } from 'components/PageBase';

// For failover deployments we fully prerender a static version of the site
export const getStaticProps: GetStaticProps = async (context) => {
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

export const getStaticPaths = async () => {
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

export default PageBase;

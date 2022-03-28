import { GetStaticPaths, GetStaticProps } from 'next';
import { PageBase } from '../components/PageBase';
import Config from '../config';
import { fetchPageProps } from '../utils/fetch/fetch-page-props';
import { isPropsWithContent } from '../types/_type-guards';
import { fetchPrerenderPaths } from '../utils/fetch/fetch-prerender-paths';

// For failover deployments we fully prerender a static version of the site
// during build-time. For regular app deployments we generate pages on demand
// with incremental regeneration

const getStaticPropsFailover: GetStaticProps = async (context) => {
    const pageProps = await fetchPageProps({
        routerQuery: context?.params?.pathRouter,
        noRedirect: true,
    });

    if (isPropsWithContent(pageProps.props)) {
        pageProps.props.content.isFailover = true;
    }

    return pageProps;
};

const getStaticPathsFailover = async () => {
    const contentPaths = await fetchPrerenderPaths();

    if (!contentPaths) {
        const msg = 'Could not retrieve paths to prerender, aborting...';
        console.error(msg);
        throw new Error(msg);
    }

    return {
        paths: contentPaths.map((pathArray) => ({
            params: { pathRouter: pathArray.split('/').filter(Boolean) },
        })),
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

export const getStaticProps = Config.isFailover
    ? getStaticPropsFailover
    : getStaticPropsRegular;

export const getStaticPaths = Config.isFailover
    ? getStaticPathsFailover
    : getStaticPathsRegular;

export default PageBase;

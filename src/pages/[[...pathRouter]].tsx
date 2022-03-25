import { GetStaticPaths, GetStaticProps } from 'next';
import { PageBase } from '../components/PageBase';
import Config from '../config';
import { fetchJson } from '../utils/fetch-utils';
import { xpServiceUrl } from '../utils/urls';
import { fetchPageProps } from '../utils/fetch-page-props';
import { isPropsWithContent } from '../types/_type-guards';

const isFailover = process.env.IS_FAILOVER_APP === 'true';

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

const getStaticPropsRegular: GetStaticProps = async (context) => {
    const pageProps = await fetchPageProps({
        routerQuery: context?.params?.pathRouter,
    });

    return {
        ...pageProps,
        revalidate: Config.vars.revalidatePeriod,
    };
};

export const getStaticProps = isFailover
    ? getStaticPropsFailover
    : getStaticPropsRegular;

const getStaticPathsFailover = async () => {
    const time = Date.now();
    const contentPaths = await fetchJson(
        `${xpServiceUrl}/sitecontentIds`,
        60000,
        {
            headers: {
                secret: process.env.SERVICE_SECRET,
            },
        }
    ).then((response) => {
        if (!response) {
            console.error('Invalid response for content ids');
            return [];
        }
        return response.map((item) => item.split('/').filter(Boolean));
    });

    console.log(`Time spent: ${(Date.now() - time) / 1000} sec`);

    return {
        paths: contentPaths.map((pathArray) => ({
            params: { pathRouter: pathArray },
        })),
        fallback: false,
    };
};

const getStaticPathsRegular: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export const getStaticPaths = isFailover
    ? getStaticPathsFailover
    : getStaticPathsRegular;

export default PageBase;

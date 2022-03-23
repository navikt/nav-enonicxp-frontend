import { GetStaticPaths, GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../components/PageBase';
import Config from '../config';
import { fetchJson } from '../utils/fetch-utils';
import { xpServiceUrl } from '../utils/urls';

const isFailover = process.env.IS_FAILOVER === 'true';
const revalidatePeriod = isFailover ? undefined : Config.vars.revalidatePeriod;

const fetchIdsToPrerender = () =>
    fetchJson(`${xpServiceUrl}/sitecontentIds`, 50000, {
        headers: {
            secret: process.env.SERVICE_SECRET,
        },
    }).then((response) => {
        if (!response) {
            console.error('Invalid response for content ids');
            return [];
        }
        return response.map((item) => item.split('/').filter(Boolean));
    });

export const getStaticProps: GetStaticProps = async (context) => {
    const props = await fetchPageProps({
        routerQuery: context?.params?.pathRouter,
        isDraft: false,
        secret: process.env.SERVICE_SECRET,
        showShadowPage: isFailover,
    });

    return {
        ...props,
        revalidate: revalidatePeriod,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    if (isFailover) {
        const time = Date.now();
        const contentPaths = await fetchIdsToPrerender();

        console.log(`Time spent: ${(Date.now() - time) / 1000} sec`);

        return {
            paths: contentPaths.map((pathArray) => ({
                params: { pathRouter: pathArray },
            })),
            fallback: false,
        };
    }

    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default PageBase;

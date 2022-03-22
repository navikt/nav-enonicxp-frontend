import { GetStaticPaths, GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../components/PageBase';
import Config from '../config';

const isFailover = process.env.IS_FAILOVER === 'true';
const revalidatePeriod = isFailover ? undefined : Config.vars.revalidatePeriod;

export const getStaticProps: GetStaticProps = async (context) => {
    const props = await fetchPageProps({
        routerQuery: context?.params?.pathRouter,
        isDraft: false,
        secret: process.env.SERVICE_SECRET,
    });

    return {
        ...props,
        revalidate: revalidatePeriod,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    if (isFailover) {
        return {
            paths: [
                {
                    params: { pathRouter: ['no', 'person'] },
                },
                {
                    params: { pathRouter: ['no', 'bedrift'] },
                },
                {
                    params: { pathRouter: ['no', 'samarbeidspartner'] },
                },
            ],
            fallback: false,
        };
    }

    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default PageBase;

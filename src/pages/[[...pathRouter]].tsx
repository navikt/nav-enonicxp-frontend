import { GetStaticPaths, GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../components/PageBase';
import Config from '../config';

export const getStaticProps: GetStaticProps = async (context) => {
    const props = await fetchPageProps({
        routerQuery: context?.params?.pathRouter,
        isDraft: false,
        secret: process.env.SERVICE_SECRET,
    });

    return {
        ...props,
        revalidate: Config.vars.revalidatePeriod,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    console.log(`Build static: ${process.env.IS_FAILOVER}`);

    if (process.env.IS_FAILOVER) {
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

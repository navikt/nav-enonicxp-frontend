import { GetStaticPaths, GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../components/PageBase';
import Config from '../config';

export const getStaticProps: GetStaticProps = async (context) => {
    const props = await fetchPageProps(
        context?.params?.pathRouter,
        false,
        process.env.SERVICE_SECRET
    );

    return {
        ...props,
        revalidate: Config.vars.revalidatePeriod,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default PageBase;

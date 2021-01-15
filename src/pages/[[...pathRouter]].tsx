import { GetStaticPaths, GetStaticProps } from 'next';
import PageBase, { fetchPageProps } from '../components/PageBase';
import Config from '../Config';

export const getStaticProps: GetStaticProps = async (context) => {
    const secret = process.env.SERVICE_SECRET as string;
    return await fetchPageProps(
        context?.params?.pathRouter,
        false,
        secret,
        Config.vars.revalidatePeriod
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default PageBase;

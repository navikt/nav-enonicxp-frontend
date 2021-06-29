import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const pathSegments = context?.params?.versionRouter;
    const { time, id } = context.query;

    const pageProps = await fetchPageProps(
        id || pathSegments,
        false,
        process.env.SERVICE_SECRET,
        time.toString()
    );

    return pageProps;
};

export default PageBase;

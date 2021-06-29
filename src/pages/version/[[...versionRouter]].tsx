import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const pathSegments = context?.params?.versionRouter;
    const time = context.query.time.toString();

    console.log(time);

    const pageProps = await fetchPageProps(
        pathSegments,
        false,
        process.env.SERVICE_SECRET,
        time
    );

    return pageProps;
};

export default PageBase;

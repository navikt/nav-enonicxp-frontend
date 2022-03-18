import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const pageProps = await fetchPageProps({
        routerQuery: context?.params?.shadowRouter,
        isDraft: false,
        showShadowPage: true,
        secret: process.env.SERVICE_SECRET,
    });

    return pageProps;
};

export default PageBase;

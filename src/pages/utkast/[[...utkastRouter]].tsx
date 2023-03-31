import { GetServerSideProps } from 'next';
import { fetchPageProps } from 'utils/fetch/fetch-page-props';
import { PageBase } from 'components/PageBase';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const pageProps = await fetchPageProps({
        routerQuery: context?.params?.utkastRouter,
        isPreview: true,
    });

    return pageProps;
};

export default PageBase;

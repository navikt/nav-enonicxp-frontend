import { GetServerSideProps } from 'next';
import { fetchPageProps } from '../../utils/fetch-page-props';
import { PageBase } from '../../components/PageBase';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const pageProps = await fetchPageProps({
        routerQuery: context?.params?.utkastRouter,
        isDraft: false,
        isPagePreview: true,
    });

    return pageProps;
};

export default PageBase;

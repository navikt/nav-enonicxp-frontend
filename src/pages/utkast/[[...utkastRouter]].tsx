import { GetServerSideProps } from 'next';
import { fetchPageProps } from '../../utils/fetch/fetch-page-props';
import { PageBase } from '../../components/PageBase';
import { isPropsWithContent } from '../../types/_type-guards';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const pageProps = await fetchPageProps({
        routerQuery: context?.params?.utkastRouter,
        isPreview: true,
    });

    if (isPropsWithContent(pageProps.props)) {
        pageProps.props.content.isPagePreview = true;
    }

    return pageProps;
};

export default PageBase;

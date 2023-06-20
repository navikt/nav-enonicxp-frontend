import { GetServerSideProps } from 'next';
import { PageBase } from 'components/PageBase';
import { getFirstElementIfArray } from 'utils/arrays';
import { fetchPageProps } from 'utils/fetch/fetch-page-props';

export const getServerSideProps: GetServerSideProps = async (context) => {
    // if (context.req.headers.secret !== process.env.SERVICE_SECRET) {
    //     return {
    //         notFound: true,
    //     };
    // }

    const pageProps = await fetchPageProps({
        locale: getFirstElementIfArray(context.query.locale),
        routerQuery: context.params?.archiveRouter,
        isArchived: true,
    });

    return pageProps;
};

export default PageBase;

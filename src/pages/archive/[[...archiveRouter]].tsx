import { GetServerSideProps } from 'next';
import { PageBase } from 'components/PageBase';
import { getFirstElementIfArray } from 'utils/arrays';
import { fetchPageProps } from 'utils/fetch/fetch-page-props';
import { isPropsWithContent } from 'types/_type-guards';

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.req.headers.secret !== process.env.SERVICE_SECRET) {
        return {
            notFound: true,
        };
    }

    const locale = getFirstElementIfArray(context.query.locale) || 'no';

    const pageProps = await fetchPageProps({
        locale,
        routerQuery: context.params?.archiveRouter,
        isArchived: true,
    });

    if (isPropsWithContent(pageProps.props)) {
        pageProps.props.content.editorView = 'archive';
        pageProps.props.content.layerLocale = locale;
    }

    return pageProps;
};

export default PageBase;

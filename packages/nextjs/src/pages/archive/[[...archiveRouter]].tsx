import { GetServerSideProps } from 'next';
import { validateSecretHeader } from '@/shared/auth';
import { PageBase } from 'components/PageBase';
import { getFirstElementIfArray } from 'utils/arrays';
import { fetchPageProps } from 'utils/fetch/fetch-page-props';
import { isPropsWithContent } from 'types/_type-guards';

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!validateSecretHeader(context.req)) {
        return {
            notFound: true,
        };
    }

    const locale = getFirstElementIfArray(context.query.locale) || 'no';

    const pageProps = await fetchPageProps({
        locale,
        routerQuery: context.params?.archiveRouter,
        isArchived: true,
        timeRequested: getFirstElementIfArray(context.query.time),
        noRedirect: true,
        isDraft: true,
    });

    if (isPropsWithContent(pageProps.props)) {
        pageProps.props.content.editorView = 'archive';
        pageProps.props.content.layerLocale = locale;
    }

    return pageProps;
};

export default PageBase;

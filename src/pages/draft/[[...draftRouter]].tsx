import { GetServerSideProps } from 'next';
import { fetchPageProps } from '../../utils/fetch/fetch-page-props';
import { PageBase } from '../../components/PageBase';
import { CustomContentProps } from '../../types/content-props/_content-common';
import { isPropsWithContent } from '../../types/_type-guards';
import { fetchVersionPageProps } from '../version/[[...versionRouter]]';

const getPageProps = async (context) => {
    const { time, branch } = context.query;
    if (time) {
        return fetchVersionPageProps(context, branch === 'draft');
    }

    const pathSegments = context?.params?.draftRouter;
    return await fetchPageProps({
        routerQuery: pathSegments,
        isDraft: true,
        noRedirect: true,
    });
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.req.headers.secret !== process.env.SERVICE_SECRET) {
        return {
            notFound: true,
        };
    }

    const pageProps = await getPageProps(context);

    if (isPropsWithContent(pageProps.props)) {
        pageProps.props.content.editorView =
            (context.query.mode as CustomContentProps['editorView']) ||
            'preview';
    }

    return pageProps;
};

export default PageBase;

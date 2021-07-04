import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';
import { ContentProps } from '../../types/content-props/_content-common';
import { isPropsWithContent } from '../../types/_type-guards';
import { fetchVersionPageProps } from '../version/[[...versionRouter]]';

const getPageProps = async (context) => {
    const { time, branch } = context.query;
    if (time) {
        return fetchVersionPageProps(context, branch === 'draft');
    }

    const pathSegments = context?.params?.draftRouter;
    return await fetchPageProps(pathSegments, true, process.env.SERVICE_SECRET);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const secret = context.req.headers.secret as string;
    if (secret !== process.env.SERVICE_SECRET) {
        return {
            notFound: true,
        };
    }

    const pageProps = await getPageProps(context);

    if (isPropsWithContent(pageProps.props)) {
        pageProps.props.content.editorView =
            (context.query.mode as ContentProps['editorView']) || 'preview';
    }

    return pageProps;
};

export default PageBase;

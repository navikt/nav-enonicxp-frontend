import { GetServerSideProps } from 'next';
import PageBase, { fetchPageProps } from '../../components/PageBase';
import { ContentProps } from '../../types/content-props/_content-common';
import { isPropsWithContent } from '../../types/_type-guards';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const secret = context.req.headers.secret as string;
    const pathSegments = context?.params?.draftRouter;

    if (secret !== process.env.SERVICE_SECRET) {
        return {
            notFound: true,
        };
    }

    const pageProps = await fetchPageProps(pathSegments, true, secret);

    if (isPropsWithContent(pageProps.props)) {
        pageProps.props.content.editorView =
            (context.query.mode as ContentProps['editorView']) || 'preview';
    }

    return pageProps;
};

export default PageBase;

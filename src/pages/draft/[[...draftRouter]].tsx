import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { fetchPageProps } from 'utils/fetch/fetch-page-props';
import { PageBase } from 'components/PageBase';
import { ContentProps } from 'types/content-props/_content-common';
import { isPropsWithContent } from 'types/_type-guards';

const getDateTime = (dateTime: string | string[]) => {
    return Array.isArray(dateTime) ? dateTime[0] : dateTime;
};

const fetchVersionPageProps = async (
    context: GetServerSidePropsContext,
    isDraft = false
) => {
    const { time, id } = context.query;

    return fetchPageProps({
        routerQuery: id,
        isDraft,
        noRedirect: true,
        timeRequested: getDateTime(time),
    });
};

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
            (context.query.mode as ContentProps['editorView']) || 'preview';
    }

    return pageProps;
};

export default PageBase;

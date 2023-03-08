import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { fetchPageProps } from 'utils/fetch/fetch-page-props';
import { PageBase } from 'components/PageBase';
import { ContentProps } from 'types/content-props/_content-common';
import { isPropsWithContent } from 'types/_type-guards';

const forceString = (str: string | string[]) => {
    return Array.isArray(str) ? str[0] : str;
};

const fetchVersionPageProps = async (context: GetServerSidePropsContext) => {
    const { time, id, branch, locale } = context.query;

    return fetchPageProps({
        routerQuery: id,
        isDraft: branch === 'draft',
        noRedirect: true,
        timeRequested: forceString(time),
        locale: forceString(locale),
    });
};

const getPageProps = async (context: GetServerSidePropsContext) => {
    const { time, locale } = context.query;

    if (time) {
        return fetchVersionPageProps(context);
    }

    const pathSegments = context?.params?.draftRouter;

    return fetchPageProps({
        routerQuery: pathSegments,
        isDraft: true,
        noRedirect: true,
        locale: forceString(locale),
    });
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.req.headers.secret !== process.env.SERVICE_SECRET) {
        return {
            notFound: true,
        };
    }

    const { locale } = context.query;

    const pageProps = await getPageProps(context);

    if (isPropsWithContent(pageProps.props)) {
        pageProps.props.content.editorView =
            (context.query.mode as ContentProps['editorView']) || 'preview';
        pageProps.props.content.layerLocale = forceString(locale);
    }

    return pageProps;
};

export default PageBase;

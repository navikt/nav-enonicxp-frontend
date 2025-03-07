import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { validateSecretHeader } from '@/shared/auth';
import { fetchPageProps } from 'utils/fetch/fetch-page-props';
import { PageBase } from 'components/PageBase';
import { ContentProps } from 'types/content-props/_content-common';
import { isPropsWithContent } from 'types/_type-guards';
import { getFirstElementIfArray } from 'utils/arrays';

const fetchVersionPageProps = async (context: GetServerSidePropsContext) => {
    const { time, id, branch, locale } = context.query;

    return fetchPageProps({
        routerQuery: id,
        isDraft: branch === 'draft',
        noRedirect: true,
        timeRequested: getFirstElementIfArray(time),
        locale: getFirstElementIfArray(locale),
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
        locale: getFirstElementIfArray(locale),
    });
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (!validateSecretHeader(context.req)) {
        return {
            notFound: true,
        };
    }

    const { locale } = context.query;

    const pageProps = await getPageProps(context);

    if (isPropsWithContent(pageProps.props)) {
        pageProps.props.content.editorView =
            (context.query.mode as ContentProps['editorView']) || 'preview';
        pageProps.props.content.layerLocale = getFirstElementIfArray(locale);
    }

    return pageProps;
};

export default PageBase;

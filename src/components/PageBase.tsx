import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { useRouter } from 'next/router';
import { FallbackPage } from './pages/fallback-page/FallbackPage';
import PageWrapper from './PageWrapper';
import ContentMapper, { isContentTypeImplemented } from './ContentMapper';
import React from 'react';
import { fetchPage } from '../utils/fetch-content';
import { makeErrorProps } from '../types/content-props/error-props';
import { ErrorPage } from './pages/error-page/ErrorPage';
import { getTargetIfRedirect } from '../utils/redirects';
import { routerQueryToXpPathOrId } from '../utils/paths';

type PageProps = {
    content: ContentProps;
};

type StaticProps = {
    props: PageProps;
    revalidate?: number;
    redirect?: { destination: string; permanent: boolean };
    notFound?: boolean;
};

export const PageBase = (props: PageProps) => {
    const router = useRouter();
    if (router.isFallback) {
        return <FallbackPage />;
    }

    if (!props?.content) {
        return (
            <ErrorPage
                {...makeErrorProps(
                    'www.nav.no',
                    'Ukjent feil - kunne ikke laste innhold'
                )}
            />
        );
    }

    const { content } = props;

    return (
        <PageWrapper content={content}>
            <ContentMapper content={content} />
        </PageWrapper>
    );
};

// These status codes may indicate that the requested page has been intentionally
// made unavailable.  We want to perform cache revalidation in these cases.
const revalidateOnErrorCode = {
    401: true, // unauthorized
    403: true, // forbidden
    404: true, // not found
};

const appError = (content: ContentProps) => ({
    content,
});

export const fetchPageProps = async (
    routerQuery: string | string[],
    isDraft = false,
    secret: string,
    revalidate?: number
): Promise<StaticProps> => {
    const xpPath = routerQueryToXpPathOrId(routerQuery || '');
    const content = await fetchPage(xpPath, isDraft, secret);

    const defaultProps = {
        props: undefined,
        ...(revalidate && { revalidate }),
    };

    if (
        (content.__typename === ContentType.Error &&
            content.data.errorCode === 404) ||
        !isContentTypeImplemented(content)
    ) {
        return {
            ...defaultProps,
            notFound: true,
        };
    }

    if (
        content.__typename === ContentType.Error &&
        !revalidateOnErrorCode[content.data.errorCode]
    ) {
        throw appError(content);
    }

    const redirectTarget = getTargetIfRedirect(content);

    if (redirectTarget) {
        return {
            ...defaultProps,
            redirect: { destination: redirectTarget, permanent: false },
        };
    }

    return {
        ...defaultProps,
        props: {
            content,
        },
    };
};

export default PageBase;

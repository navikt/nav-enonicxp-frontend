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
import { error1337ReloadProps } from './pages/error-page/errorcode-content/Error1337ReloadOnDevBuildError';

type PageProps = {
    content: ContentProps;
};

type StaticProps = {
    props: PageProps;
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

const errorHandlerProd = (content: ContentProps) => {
    if (!revalidateOnErrorCode[content.data.errorCode]) {
        throw appError(content);
    }

    return { props: { content } };
};

// Allow build-time errors when not in production
const errorHandlerDev = (content: ContentProps) => {
    if (!revalidateOnErrorCode[content.data.errorCode]) {
        // NEXT_PHASE === 'phase-production-build' during the build phase
        if (process.env.NEXT_PHASE !== 'phase-production-build') {
            throw appError(content);
        }

        return {
            props: {
                content: error1337ReloadProps(content._path),
            },
        };
    }

    return { props: { content } };
};

const errorHandler =
    process.env.APP_ORIGIN === 'https://www.nav.no'
        ? errorHandlerProd
        : errorHandlerDev;

const isNotFound = (content) =>
    (content.__typename === ContentType.Error &&
        content.data.errorCode === 404) ||
    !isContentTypeImplemented(content);

export const fetchPageProps = async (
    routerQuery: string | string[],
    isDraft = false,
    secret: string
): Promise<StaticProps> => {
    const xpPath = routerQueryToXpPathOrId(routerQuery || '');
    const content = await fetchPage(xpPath, isDraft, secret);

    if (isNotFound(content)) {
        return {
            props: { content },
            notFound: true,
        };
    }

    if (content.__typename === ContentType.Error) {
        return errorHandler(content);
    }

    const redirectTarget = getTargetIfRedirect(content);

    if (redirectTarget) {
        return {
            props: { content },
            redirect: { destination: redirectTarget, permanent: false },
        };
    }

    return {
        props: { content },
    };
};

export default PageBase;

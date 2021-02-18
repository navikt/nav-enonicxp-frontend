import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { useRouter } from 'next/router';
import { FallbackPage } from './pages/fallback-page/FallbackPage';
import PageWrapper from './PageWrapper';
import ContentMapper from './ContentMapper';
import React from 'react';
import { fetchPage } from '../utils/fetch-content';
import { makeErrorProps } from '../utils/make-error-props';
import { ErrorPage } from './pages/error-page/ErrorPage';
import { getTargetIfRedirect } from '../utils/redirects';
import {
    routerQueryToXpPathOrId,
    sanitizeUrl,
    xpPathToPathname,
} from '../utils/paths';
import { errorHandler, isNotFound } from '../utils/errors';

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

export const fetchPageProps = async (
    routerQuery: string | string[],
    isDraft = false,
    secret: string
): Promise<StaticProps> => {
    const xpPath = routerQueryToXpPathOrId(routerQuery || '');
    const content = await fetchPage(xpPath, isDraft, secret);

    if (isNotFound(content)) {
        const sanitizedPath = sanitizeUrl(xpPath);

        if (sanitizedPath !== xpPath) {
            return {
                props: { content },
                redirect: {
                    destination: xpPathToPathname(sanitizedPath),
                    permanent: false,
                },
            };
        }

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

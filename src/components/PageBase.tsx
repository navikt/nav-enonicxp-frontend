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
    getMediaUrl,
    getRelativePathIfInternal,
    routerQueryToXpPathOrId,
    sanitizeLegacyUrl,
    stripXpPathPrefix,
} from '../utils/urls';
import { errorHandler, isNotFound } from '../utils/errors';
import { isMediaContent } from '../types/media';
import globalState from '../globalState';

type PageProps = {
    content: ContentProps;
};

type StaticProps = {
    props: PageProps | {};
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

    globalState.isDraft = !!content.isDraft;

    return (
        <PageWrapper content={content}>
            <ContentMapper content={content} />
        </PageWrapper>
    );
};

const redirectProps = (destination: string, isTemporary: boolean) => ({
    props: {},
    redirect: {
        // Decode then (re)encode to ensure the destination is not double-encoded
        destination: encodeURI(decodeURI(destination).trim()),
        // Negate IsTemporary (if not valid/null, permanent will be true)
        permanent: false,
    },
});

export const fetchPageProps = async (
    routerQuery: string | string[],
    isDraft = false,
    secret: string,
    versionTimestamp?: string
): Promise<StaticProps> => {
    const xpPath = routerQueryToXpPathOrId(routerQuery || '');
    const content = await fetchPage(xpPath, isDraft, secret, versionTimestamp);

    // Media content should redirect to the mediaUrl generated by XP (temporary redirect)
    if (isMediaContent(content)) {
        return redirectProps(getMediaUrl(content.mediaUrl, isDraft), true);
    }

    if (isNotFound(content)) {
        const sanitizedPath = sanitizeLegacyUrl(xpPath);

        if (sanitizedPath !== xpPath) {
            return redirectProps(stripXpPathPrefix(sanitizedPath), false);
        }

        return {
            props: {},
            notFound: true,
        };
    }

    if (content.__typename === ContentType.Error) {
        return errorHandler(content);
    }

    const redirectTarget = getTargetIfRedirect(content);
    if (redirectTarget) {
        return redirectProps(
            getRelativePathIfInternal(redirectTarget, isDraft),
            content.data?.tempRedirect
        );
    }

    return {
        props: { content },
    };
};

export default PageBase;

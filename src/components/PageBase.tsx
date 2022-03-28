import {
    ContentProps,
    ContentType,
} from '../types/content-props/_content-common';
import { useRouter } from 'next/router';
import { FallbackPage } from './pages/fallback-page/FallbackPage';
import PageWrapper from './PageWrapper';
import ContentMapper from './ContentMapper';
import React from 'react';
import { fetchPage } from '../utils/fetch/fetch-content';
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
    __N_REDIRECT?: string;
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

    // A redirect bug in Next will cause "/no/person#" to return 500 when a link tries to redirect to
    // "/no/person" (without the hash). This will send the data through to BasePage even though
    // a redirect directive was returned from getStaticProps. Therefore check for the __N_REDIRECT
    // below and force a push and reload to finally end user up at NAV the redirect location.
    // This issue does not apply to other URL's ending with a hash as redirecting seems to work properly there.
    // Todo: Find the underlying problem why the "#" prevents proper redirect and instead passes through to PageBase component.
    if (!props?.content && props.__N_REDIRECT) {
        router.reload();
        return;
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

    globalState.isEditorView = !!content.editorView;

    return (
        <PageWrapper content={content}>
            <ContentMapper content={content} />
        </PageWrapper>
    );
};

const redirectProps = (destination: string, isPermanent: boolean) => ({
    props: {},
    redirect: {
        // Decode then (re)encode to ensure the destination is not double-encoded
        destination: encodeURI(decodeURI(destination).trim()),
        // False if not defined
        permanent: isPermanent || false,
    },
});

interface FetchPageProps {
    routerQuery: string | string[];
    isDraft?: boolean;
    isPagePreview?: boolean;
    secret: string;
    versionTimestamp?: string;
}

export const fetchPageProps = async ({
    routerQuery,
    isDraft = false,
    isPagePreview = false,
    secret,
    versionTimestamp,
}: FetchPageProps): Promise<StaticProps> => {
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

    if (!isDraft && !isPagePreview) {
        const redirectTarget = getTargetIfRedirect(content);
        if (redirectTarget) {
            return redirectProps(
                getRelativePathIfInternal(redirectTarget, isDraft),
                content.data?.permanentRedirect
            );
        }
    }

    return {
        props: { content },
    };
};

export default PageBase;

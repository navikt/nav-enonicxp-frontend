import { ContentProps } from '../types/content-props/_content-common';
import { useRouter } from 'next/router';
import { FallbackPage } from './pages/fallback-page/FallbackPage';
import PageWrapper from './PageWrapper';
import ContentMapper from './ContentMapper';
import React from 'react';
import { makeErrorProps } from '../utils/make-error-props';
import { ErrorPage } from './pages/error-page/ErrorPage';
import globalState from '../globalState';

type PageProps = {
    content: ContentProps;
    __N_REDIRECT?: string;
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

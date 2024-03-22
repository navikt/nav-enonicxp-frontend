import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { PageWrapper } from './PageWrapper';
import { ContentMapper } from './ContentMapper';
import { makeErrorProps } from 'utils/make-error-props';
import { PageContextProvider } from 'store/pageContext';
import { FallbackPage } from './pages/fallback-page/FallbackPage';

export type PageProps = {
    content: ContentProps;
    __N_REDIRECT?: string;
};

export const PageBase = (props: PageProps) => {
    const content =
        props?.content ||
        makeErrorProps('www.nav.no', 'Ukjent feil - kunne ikke laste innhold');

    if (!content) {
        return <FallbackPage />;
    }

    return (
        <PageContextProvider content={content}>
            <PageWrapper content={content}>
                <ContentMapper content={content} />
            </PageWrapper>
        </PageContextProvider>
    );
};

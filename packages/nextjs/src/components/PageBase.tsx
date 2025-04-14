import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { makeErrorProps } from 'utils/make-error-props';
import { PageContextProvider } from 'store/pageContext';
import { PageWrapper } from './PageWrapper';
import { ContentMapper } from './ContentMapper';

export type PageProps = {
    content: ContentProps;
    __N_REDIRECT?: string;
};

export const PageBase = (props: PageProps) => {
    const content =
        props?.content ?? makeErrorProps('www.nav.no', 'Ukjent feil - kunne ikke laste innhold');

    return (
        <PageContextProvider content={content}>
            <PageWrapper content={content}>
                <ContentMapper content={content} />
            </PageWrapper>
        </PageContextProvider>
    );
};

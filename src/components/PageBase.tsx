import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { PageContextProvider } from 'store/pageContext';
import { PageWrapper } from './PageWrapper';
import { ContentMapper } from './ContentMapper';

export type PageProps = {
    content: ContentProps;
};

export const PageBase = ({ content }: PageProps) => {
    return (
        <PageContextProvider content={content}>
            <PageWrapper>
                <ContentMapper content={content} />
            </PageWrapper>
        </PageContextProvider>
    );
};

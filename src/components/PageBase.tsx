import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { PageContextProvider } from 'store/pageContext';
import { PageWrapper } from './PageWrapper';
import { ContentMapperNew } from './_experimental/ContentMapperNew';

export type PageProps = {
    content: ContentProps;
};

export const PageBase = ({ content }: PageProps) => {
    return (
        <PageContextProvider content={content}>
            <PageWrapper>
                <ContentMapperNew content={content} />
            </PageWrapper>
        </PageContextProvider>
    );
};

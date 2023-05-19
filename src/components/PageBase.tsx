import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { PageWrapper } from './PageWrapper';
import { ContentMapper } from './ContentMapper';
import { makeErrorProps } from 'utils/make-error-props';
import { ErrorPage } from './pages/error-page/ErrorPage';
import globalState from '../globalState';

type PageProps = {
    content: ContentProps;
    __N_REDIRECT?: string;
};

export const PageBase = (props: PageProps) => {
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

import React from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { PageWrapper } from './PageWrapper';
import { ContentMapper } from './ContentMapper';
import { makeErrorProps } from 'utils/make-error-props';
import globalState from '../globalState';

export type PageProps = {
    content: ContentProps;
    __N_REDIRECT?: string;
};

export const PageBase = (props: PageProps) => {
    const content =
        props?.content ||
        makeErrorProps('www.nav.no', 'Ukjent feil - kunne ikke laste innhold');

    globalState.isEditorView = !!content.editorView;

    return (
        <PageWrapper content={content}>
            <ContentMapper content={content} />
        </PageWrapper>
    );
};

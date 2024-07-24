import React from 'react';
import type { Preview } from '@storybook/react';
import { PageContextProvider } from '../src/store/pageContext';
import { ContentProps, ContentType } from '../src/types/content-props/_content-common';
import '../src/global.scss';

// TODO: kopiert fra api/component-preview.tsx
const contentPropsFull: ContentProps = {
    type: ContentType.DynamicPage,
    _id: '',
    _path: '',
    createdTime: '',
    modifiedTime: '',
    displayName: '',
    language: 'no',
    isDraft: true,
    editorView: 'edit',
    isPagePreview: false,
    data: {},
    // ...contentProps,
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        }, //TODO: det over hører til Example, fjerne hvis ikke brukt
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <PageContextProvider content={contentPropsFull}>
                <Story />
            </PageContextProvider>
        ),
    ],
    tags: ['autodocs'],
};

export default preview;

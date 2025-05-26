import type { Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { PageWarnings } from './PageWarnings';

const meta = {
    component: PageWarnings,
} satisfies Meta<typeof PageWarnings>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MultipleWarnings: Story = {
    args: {
        content: {
            language: 'no',
            editorView: 'edit' as const,
            type: ContentType.ContactInformationPage,
            isPagePreview: true,
            isFailover: true,
            originalType: ContentType.MainArticle,
            redirectToLayer: 'en',
        },
    },
};

export const WhiteBackground: Story = {
    args: {
        content: {
            ...MultipleWarnings.args.content,
            type: ContentType.MainArticle,
            data: {
                contentType: 'news',
            },
        },
    },
};

export const English: Story = {
    args: {
        content: {
            ...MultipleWarnings.args.content,
            language: 'en',
        },
    },
};

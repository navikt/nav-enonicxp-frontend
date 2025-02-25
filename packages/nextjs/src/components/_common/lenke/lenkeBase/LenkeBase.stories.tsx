import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { PageContextProvider } from 'store/pageContext';
import { adminPreviewUrlPrefix, LenkeBase } from './LenkeBase';

const withMockedPageContent = (Story: any) => (
    <PageContextProvider content={{ editorView: 'edit' }}>
        <Story />
    </PageContextProvider>
);
const meta: Meta<typeof LenkeBase> = {
    component: LenkeBase,
    decorators: [withMockedPageContent],
};

export default meta;
type Story = StoryObj<typeof LenkeBase>;

export const Default: Story = {
    args: {
        href: '/',
        children: 'Trykk her',
    },
};

export const BadLinkWarning: Story = {
    args: {
        href: adminPreviewUrlPrefix,
        children: 'Trykk her',
    },
};

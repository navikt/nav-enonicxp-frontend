import type { Meta, StoryObj } from '@storybook/react';
import { PageContextProvider } from 'store/pageContext';
import { EditorLinkWrapper } from './EditorLinkWrapper';

const withMockedPageContent = (Story: any) => (
    <PageContextProvider content={{ editorView: 'edit' }}>
        <Story />
    </PageContextProvider>
);

const meta = {
    component: EditorLinkWrapper,
    decorators: [withMockedPageContent],
} satisfies Meta<typeof EditorLinkWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: <a href="https://www.nav.no">nav.no</a>,
    },
};

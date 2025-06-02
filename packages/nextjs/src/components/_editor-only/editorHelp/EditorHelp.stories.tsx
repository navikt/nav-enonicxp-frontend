import type { Meta, StoryObj } from '@storybook/react';
import { PageContextProvider } from 'store/pageContext';
import { EditorHelp } from './EditorHelp';

const withMockedPageContent = (Story: any) => (
    <PageContextProvider content={{ editorView: 'edit' }}>
        <Story />
    </PageContextProvider>
);

const meta = {
    component: EditorHelp,
    decorators: [withMockedPageContent],
} satisfies Meta<typeof EditorHelp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
    args: {
        text: 'Help text',
        globalWarningText: 'Global warning text',
        type: 'info',
    },
};

export const Error: Story = {
    args: {
        ...Info.args,
        type: 'error',
    },
};

export const Help: Story = {
    args: {
        ...Info.args,
        type: 'help',
    },
};

export const ArrowUp: Story = {
    args: {
        ...Info.args,
        type: 'arrowUp',
    },
};

export const ArrowDown: Story = {
    args: {
        ...Info.args,
        type: 'arrowDown',
    },
};

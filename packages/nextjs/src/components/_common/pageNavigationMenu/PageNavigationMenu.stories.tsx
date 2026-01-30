import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { PageContextProvider } from 'store/pageContext';
import { PageNavigationMenu } from './PageNavigationMenu';
import { anchorLinksMock, contentMockBase } from './_storyMocks';

const withPageContext: Decorator = (Story) => (
    <PageContextProvider content={contentMockBase}>
        <Story />
    </PageContextProvider>
);

const meta = {
    component: PageNavigationMenu,
    decorators: [withPageContext],
    args: {
        title: 'Innhold på siden',
        anchorLinks: anchorLinksMock,
    },
} satisfies Meta<typeof PageNavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        ariaLabel: 'Innhold på siden',
    },
};

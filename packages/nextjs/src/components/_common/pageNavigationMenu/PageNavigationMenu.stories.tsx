import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { PageContextProvider } from 'store/pageContext';
import { ContentType } from 'types/content-props/_content-common';
import { PageNavigationMenu } from './PageNavigationMenu';

const withPageContext: Decorator = (Story) => (
    <PageContextProvider
        content={
            {
                _path: '/no/person/dagpenger',
                type: ContentType.ProductPage,
                data: {},
                page: { config: {} },
            } as any
        }
    >
        <Story />
    </PageContextProvider>
);

const meta = {
    component: PageNavigationMenu,
    decorators: [withPageContext],
    args: {
        title: 'Innhold på siden',
        anchorLinks: [
            { anchorId: 'anchorId', linkText: 'Hvem kan få?', isDupe: false },
            { anchorId: 'anchorId', linkText: 'Hva kan du få?', isDupe: false },
        ],
    },
} satisfies Meta<typeof PageNavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        ariaLabel: 'Innhold på siden',
    },
};

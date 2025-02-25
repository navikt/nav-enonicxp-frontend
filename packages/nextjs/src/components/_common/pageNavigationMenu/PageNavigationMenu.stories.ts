import type { Meta, StoryObj } from '@storybook/react';
import { PageNavigationMenu } from './PageNavigationMenu';

const meta = {
    component: PageNavigationMenu,
    args: {
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
        title: 'Innhold på siden',
        isChapterNavigation: true,
    },
};

export const Secondary: Story = {
    args: {
        title: 'I dette kapittelet',
        isChapterNavigation: false,
    },
};

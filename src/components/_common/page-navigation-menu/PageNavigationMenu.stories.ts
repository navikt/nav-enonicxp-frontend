import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PageNavigationMenu } from './PageNavigationMenu';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Example/PageNavigationMenu',
    component: PageNavigationMenu,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // args: { onClick: fn() },
} satisfies Meta<typeof PageNavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        title: 'Innhold på siden',
        anchorLinks: [
            { anchorId: 'anchorId', linkText: 'Hvem kan få?', isDupe: false },
            { anchorId: 'anchorId', linkText: 'Hva kan du få?', isDupe: false },
        ],
        isChapterNavigation: true,
    },
};

export const Secondary: Story = {
    args: {
        title: 'I dette kapittelet',
        anchorLinks: [
            { anchorId: 'anchorId', linkText: 'Hvem kan få?', isDupe: false },
            { anchorId: 'anchorId', linkText: 'Hva kan du få?', isDupe: false },
        ],
        isChapterNavigation: false,
    },
};

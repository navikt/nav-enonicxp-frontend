import type { Meta, StoryObj } from '@storybook/react';
import { FancyChevron } from './FancyChevron';

const meta = {
    component: FancyChevron,
    args: {
        color: 'white',
    },
} satisfies Meta<typeof FancyChevron>;

export default meta;
type Story = StoryObj<typeof meta>;

export const White: Story = {};

export const Blue: Story = {
    args: {
        color: 'blue',
    },
};

export const Small: Story = {
    args: {
        scale: 0.5,
    },
};

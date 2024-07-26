import type { Meta, StoryObj } from '@storybook/react';
import { Chevron } from './Chevron';

const meta = {
    title: 'Components/Common/Chevron',
    component: Chevron,
} satisfies Meta<typeof Chevron>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        direction: 'Right',
    },
};

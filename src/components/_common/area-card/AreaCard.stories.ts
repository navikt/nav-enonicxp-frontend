import type { Meta, StoryObj } from '@storybook/react';
import { AreaCard } from './AreaCard';

const meta = {
    title: 'Example/AreaCard',
    component: AreaCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof AreaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Work: Story = {
    args: {
        path: '',
        title: 'Arbeid',
        area: 'work',
    },
};

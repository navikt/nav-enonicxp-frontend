import type { Meta, StoryObj } from '@storybook/react';
import { AreaCard } from './AreaCard';

const meta = {
    title: 'Example/AreaCard',
    component: AreaCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { path: '' },
} satisfies Meta<typeof AreaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Work: Story = {
    args: {
        title: 'Arbeid',
        area: 'work',
    },
};

export const Family: Story = {
    args: {
        title: 'Familie og barn',
        area: 'family',
    },
};

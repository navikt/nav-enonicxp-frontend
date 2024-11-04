import type { Meta, StoryObj } from '@storybook/react';
import { AreaCard } from './AreaCard';

const meta = {
    component: AreaCard,
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

export const Employment: Story = {
    args: {
        title: 'Test',
        area: 'employment-status-form',
    },
};

export const Health: Story = {
    args: {
        title: 'Helse og sykdom',
        area: 'health',
    },
};
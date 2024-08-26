import type { Meta, StoryObj } from '@storybook/react';
import TextWithIndicator from './TextWithIndicator';

const meta = {
    component: TextWithIndicator,
} satisfies Meta<typeof TextWithIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        text: 'Aktiv',
        isActive: true,
    },
};

export const Secondary: Story = {
    args: {
        text: 'Inaktiv',
        isActive: false,
    },
};

export const Prefix: Story = {
    args: {
        text: 'Aktiv',
        isActive: true,
        prefix: 'Prefix:',
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { AlertBox } from './AlertBox';

const meta = {
    title: 'Components/Common/AlertBox',
    component: AlertBox,
    args: { children: 'Dette er en AlertBox', variant: 'info' },
} satisfies Meta<typeof AlertBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        variant: 'success',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
    },
};

export const Info: Story = {
    args: {
        variant: 'info',
    },
};

export const Error: Story = {
    args: {
        variant: 'error',
    },
};

export const Small: Story = {
    args: {
        size: 'small',
    },
};

export const Inline: Story = {
    args: {
        inline: true,
    },
};

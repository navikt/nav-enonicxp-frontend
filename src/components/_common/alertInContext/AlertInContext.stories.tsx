import type { Meta, StoryObj } from '@storybook/react';
import { AlertInContext } from './AlertInContext';

const meta = {
    component: AlertInContext,
    args: {
        data: {
            type: 'information',
            text: 'Dette er en AlertInContext',
        },
    },
} satisfies Meta<typeof AlertInContext>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Information: Story = {};

export const Critical: Story = {
    args: {
        data: {
            ...meta.args.data,
            type: 'critical',
        },
    },
};

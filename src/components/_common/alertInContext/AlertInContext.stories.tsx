import type { Meta, StoryObj } from '@storybook/react';
import { AlertInContext } from './AlertInContext';

const meta = {
    component: AlertInContext,
    args: {
        alert: {
            data: {
                type: 'information',
                text: 'Dette er en AlertInContext',
                target: {
                    _selected: '1',
                    formDetails: {
                        _selected: 'targetContent',
                        targetContent: 'Dette er en AlertInContext',
                    },
                },
            },
        },
    },
} satisfies Meta<typeof AlertInContext>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Information: Story = {};

export const Critical: Story = {
    args: {
        alert: {
            data: {
                ...meta.args.alert.data,
                type: 'critical',
            },
        },
    },
};

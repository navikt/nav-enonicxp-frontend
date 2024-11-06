import type { Meta, StoryObj } from '@storybook/react';

import { CallOption } from './CallOption';

const meta = {
    component: CallOption,
    parameters: {
        backgrounds: {
            values: [{ name: 'ContactBackground', value: '#f2f3f5' }],
            default: 'ContactBackground',
        },
    },
} satisfies Meta<typeof CallOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAlert: Story = { args: { alertText: 'Alert!' } };

import type { Meta, StoryObj } from '@storybook/react';

import { WriteOption } from './WriteOption';

const meta = {
    component: WriteOption,
    parameters: {
        backgrounds: {
            values: [{ name: 'ContactBackground', value: '#f2f3f5' }],
            default: 'ContactBackground',
        },
    },
} satisfies Meta<typeof WriteOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAlert: Story = { args: { alertText: 'Alert!' } };

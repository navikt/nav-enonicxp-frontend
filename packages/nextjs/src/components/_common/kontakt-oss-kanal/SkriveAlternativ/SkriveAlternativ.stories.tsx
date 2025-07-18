import type { Meta, StoryObj } from '@storybook/react';

import { SkriveAlternativ } from './SkriveAlternativ';

const meta = {
    component: SkriveAlternativ,
    parameters: {
        backgrounds: {
            values: [{ name: 'ContactBackground', value: '#f2f3f5' }],
            default: 'ContactBackground',
        },
    },
} satisfies Meta<typeof SkriveAlternativ>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAlert: Story = { args: { alertText: 'Alert!' } };

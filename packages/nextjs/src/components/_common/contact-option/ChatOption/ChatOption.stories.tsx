import type { Meta, StoryObj } from '@storybook/react';

import { ChatOption } from './ChatOption';

const meta = {
    component: ChatOption,
    parameters: {
        backgrounds: {
            values: [{ name: 'ContactBackground', value: '#f2f3f5' }],
            default: 'ContactBackground',
        },
    },
} satisfies Meta<typeof ChatOption>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };

export const WithAlert: Story = { args: { alertText: 'Alert!' } };

export const RegularOpeningHours: Story = {
    args: {
        regularOpeningHours: {
            hours: [
                { status: 'OPEN', dayName: 'monday', from: '00:00', to: '23:59' },
                { status: 'OPEN', dayName: 'tuesday', from: '00:00', to: '23:59' },
                { status: 'OPEN', dayName: 'wednesday', from: '00:00', to: '23:59' },
                { status: 'OPEN', dayName: 'thursday', from: '00:00', to: '23:59' },
                { status: 'OPEN', dayName: 'friday', from: '00:00', to: '23:59' },
                { status: 'OPEN', dayName: 'saturday', from: '00:00', to: '23:59' },
                { status: 'OPEN', dayName: 'sunday', from: '00:00', to: '23:59' },
            ],
        },
    },
};

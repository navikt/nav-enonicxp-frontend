import type { Meta, StoryObj } from '@storybook/react';

import { OpeningInfo } from './OpeningInfo';

const meta = {
    component: OpeningInfo,
} satisfies Meta<typeof OpeningInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {
    args: {
        regularOpeningHours: {
            hours: [
                { status: 'CLOSED', dayName: 'monday' },
                { status: 'CLOSED', dayName: 'tuesday' },
                { status: 'CLOSED', dayName: 'wednesday' },
                { status: 'CLOSED', dayName: 'thursday' },
                { status: 'CLOSED', dayName: 'friday' },
                { status: 'CLOSED', dayName: 'saturday' },
                { status: 'CLOSED', dayName: 'sunday' },
            ],
        },
        specialOpeningHours: {
            validFrom: '2023-03-01T00:00:00Z',
            validTo: '2050-03-01T00:00:00Z',
        },
    },
};

export const Open: Story = {
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
        specialOpeningHours: {
            validFrom: '2023-01-01T00:00:00Z',
            validTo: '2050-01-01T00:00:00Z',
        },
    },
};

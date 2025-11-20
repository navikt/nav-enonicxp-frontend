import type { Meta, StoryObj } from '@storybook/react';
import { OfficeDetails } from './OfficeDetails';
import { mockOfficeData, mockReception1, mockReception2 } from './mockData';

const meta = {
    component: OfficeDetails,
} satisfies Meta<typeof OfficeDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        officeData: {
            ...mockOfficeData,
            brukerkontakt: {
                ...mockOfficeData.brukerkontakt,
                publikumsmottak: [mockReception2, mockReception1],
            },
        },
    },
};

export const Arbeidslivssenter: Story = {
    args: {
        officeData: {
            ...mockOfficeData,
            type: 'ALS',
        },
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { mockOfficeData } from 'components/pages/office-page/officeDetails/mockData';
import { OfficeInformation } from './OfficeInformation';

const meta = {
    component: OfficeInformation,
} satisfies Meta<typeof OfficeInformation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
    args: {
        officeData: mockOfficeData,
        initialOpen: true,
    },
};

export const Closed: Story = {
    args: {
        officeData: mockOfficeData,
        initialOpen: false,
    },
};

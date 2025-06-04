import type { Meta, StoryObj } from '@storybook/react';
import { mockOfficeData } from 'components/pages/office-page/officeDetails/mockData';
import { PhonePoster } from './PhonePoster';

const meta = {
    component: PhonePoster,
} satisfies Meta<typeof PhonePoster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        officeData: {
            ...mockOfficeData,
        },
    },
};

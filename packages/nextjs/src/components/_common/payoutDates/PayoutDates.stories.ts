import type { Meta, StoryObj } from '@storybook/react';
import { PayoutDates } from './PayoutDates';

const meta = {
    component: PayoutDates,
} satisfies Meta<typeof PayoutDates>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        payoutDatesData: {
            year: 2024,
            dates: {
                jan: 15,
                feb: 15,
                mar: 14,
                apr: 15,
                may: 15,
                jun: 17,
                jul: 15,
                aug: 15,
                sep: 15,
                oct: 12,
                nov: 15,
                dec: 15,
            },
        },
    },
};

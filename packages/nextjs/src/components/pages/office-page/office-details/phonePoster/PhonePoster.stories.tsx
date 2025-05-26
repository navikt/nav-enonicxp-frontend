import type { Meta, StoryObj } from '@storybook/react';
import { MockOfficeData } from 'components/pages/office-page/office-details/officeInformation/OfficeInformation.stories';
import { PhonePoster } from './PhonePoster';

const meta = {
    component: PhonePoster,
} satisfies Meta<typeof PhonePoster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        officeData: {
            ...MockOfficeData,
        },
    },
};

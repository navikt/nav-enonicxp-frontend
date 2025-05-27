import type { Meta, StoryObj } from '@storybook/react';
import { AudienceChannels } from 'components/pages/office-page/officeDetails/phonePoster/AudienceChannels';
import { mockAudienceContact } from 'components/pages/office-page/officeDetails/mockData';

const meta = {
    component: AudienceChannels,
} satisfies Meta<typeof AudienceChannels>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        publikumskanaler: [mockAudienceContact],
    },
};

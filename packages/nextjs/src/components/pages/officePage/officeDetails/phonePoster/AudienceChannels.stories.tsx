import type { Meta, StoryObj } from '@storybook/react';
import { AudienceChannels } from 'components/pages/officePage/officeDetails/phonePoster/AudienceChannels';
import { mockAudienceContact } from 'components/pages/officePage/officeDetails/mockData';

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

import type { Meta, StoryObj } from '@storybook/react';

import { AudienceChannels } from './AudienceChannels';

const meta = {
    component: AudienceChannels,
} satisfies Meta<typeof AudienceChannels>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        publikumskanaler: [
            {
                beskrivelse: 'Kontakt oss',
                telefon: '12345678',
                epost: 'oslo@nav.no',
                sortOrder: 1,
            },
            {
                beskrivelse: 'Kontakt oss 2',
                telefon: '12345679',
                epost: 'oslo2@nav.no',
                sortOrder: 2,
            },
        ],
    },
};

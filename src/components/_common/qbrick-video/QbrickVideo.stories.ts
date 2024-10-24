// Dette er del 1. TODO: Publicview
import type { Meta, StoryObj } from '@storybook/react';
import { QbrickVideo } from './QbrickVideo';

const meta = {
    component: QbrickVideo,
    args: {
        title: 'Har du økonomiske bekymringer?',
        mediaId: 'aca3526f-93c1-49a6-9998-1d1495b47163',
        duration: 134.08,
        poster: 'https://www.nav.no/no/person/sosialhjelp-og-radgiving/livssituasjoner/trenger-okonomi-og-gjeldsradgivning/har-okonomiske-bekymringer/har-okonomiske-bekymringer.jpg',
        language: '',
        accountId: '123456',
    },
} satisfies Meta<typeof QbrickVideo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hover: Story = {
    parameters: {
        pseudo: { hover: true },
    },
};

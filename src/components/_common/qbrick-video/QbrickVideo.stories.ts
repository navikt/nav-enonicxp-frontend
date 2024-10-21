import type { Meta, StoryObj } from '@storybook/react';

import { QbrickVideo } from './QbrickVideo';

const meta = {
    component: QbrickVideo,
    args: {
        title: 'title',
        mediaId: 'cfb46ba5-cdc8-490c-8749-bdc21720ae1b',
        duration: 200,
        poster: '',
        language: '',
        accountId: '763558',
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

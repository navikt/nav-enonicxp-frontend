import type { Meta, StoryObj } from '@storybook/react';

import { CardType } from 'types/card';
import { LargeCardV2 } from './LargeCardV2';

const meta = {
    component: LargeCardV2,
} satisfies Meta<typeof LargeCardV2>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        link: { url: '', text: 'LargeCardV2' },
        type: CardType.Product,
        description: 'Description',
        tagline: 'Tagline',
    },
};

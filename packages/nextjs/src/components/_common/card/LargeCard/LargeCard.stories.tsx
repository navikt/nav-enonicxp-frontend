import type { Meta, StoryObj } from '@storybook/react';
import { CardType } from 'types/card';
import { ContentType } from 'types/content-props/_content-common';
import { MediaType } from 'types/media';
import { LargeCard } from './LargeCard';

const meta = {
    component: LargeCard,
} satisfies Meta<typeof LargeCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        link: { url: '', text: 'LargeCard' },
        type: CardType.Product,
        description: 'Description',
        tagline: 'Tagline',
    },
};

export const Illustration: Story = {
    args: {
        ...Default.args,
        illustration: {
            type: ContentType.Pictograms,
            data: { icons: [{ icon: { type: MediaType.Vector, mediaUrl: 'placeholder' } }] },
        },
    },
};

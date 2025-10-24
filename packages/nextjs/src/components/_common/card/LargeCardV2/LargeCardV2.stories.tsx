import type { Meta, StoryObj } from '@storybook/react';
import { CardType } from 'types/card';
import { ContentType } from 'types/content-props/_content-common';
import { MediaType } from 'types/media';
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

export const Illustration: Story = {
    args: {
        ...Default.args,
        illustration: {
            type: ContentType.Pictograms,
            data: { icons: [{ icon: { type: MediaType.Vector, mediaUrl: 'placeholder' } }] },
        },
    },
};

export const Hover: Story = {
    args: {
        ...Default.args,
    },
    parameters: { pseudo: { hover: true } },
};

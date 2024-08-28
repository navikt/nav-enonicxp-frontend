import type { Meta, StoryObj } from '@storybook/react';
import { CardType } from 'types/card';
import { ContentType } from 'types/content-props/_content-common';
import { MediaType } from 'types/media';
import { LargeCardV1 } from './LargeCardV1';

const meta = {
    component: LargeCardV1,
} satisfies Meta<typeof LargeCardV1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        link: { url: '', text: 'LargeCardV1' },
        description: 'Description',
        tagline: 'Tagline',
        type: CardType.Product,
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
    parameters: {
        pseudo: { hover: true },
    },
};

export const ProductHover: Story = {
    args: {
        ...Default.args,
    },
    parameters: {
        pseudo: { hover: true },
    },
};

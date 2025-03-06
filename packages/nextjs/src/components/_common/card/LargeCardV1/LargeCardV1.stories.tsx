import type { Meta, StoryObj } from '@storybook/react';
import { CardType } from 'types/card';
import { ContentType } from 'types/content-props/_content-common';
import { MediaType } from 'types/media';
import { LargeCardV1 } from './LargeCardV1';

const meta = {
    component: LargeCardV1,
    args: {
        link: { url: '', text: 'LargeCardV1' },
        description: 'Description',
        tagline: 'Tagline',
        type: CardType.Product,
    },
} satisfies Meta<typeof LargeCardV1>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Illustration: Story = {
    args: {
        illustration: {
            type: ContentType.Pictograms,
            data: { icons: [{ icon: { type: MediaType.Vector, mediaUrl: 'placeholder' } }] },
        },
    },
};

export const ProductHover: Story = {
    parameters: {
        pseudo: { hover: true },
    },
};

export const SituationHover: Story = {
    args: { type: CardType.Situation },
    parameters: {
        pseudo: { hover: true },
    },
};

export const ThemedArticleHover: Story = {
    args: { type: CardType.ThemedArticle },
    parameters: {
        pseudo: { hover: true },
    },
};

export const GuideHover: Story = {
    args: { type: CardType.Guide },
    parameters: {
        pseudo: { hover: true },
    },
};

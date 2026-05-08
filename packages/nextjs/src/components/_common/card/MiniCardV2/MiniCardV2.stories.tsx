import type { Meta, StoryObj } from '@storybook/react';
import { CardType } from 'types/card';
import { MiniCardV2 } from './MiniCardV2';

const meta = {
    component: MiniCardV2,
    args: {
        link: { url: '', text: 'Tittel' },
        type: CardType.Product,
        tagline: 'Kategori',
    },
} satisfies Meta<typeof MiniCardV2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Hover: Story = { parameters: { pseudo: { hover: true } } };

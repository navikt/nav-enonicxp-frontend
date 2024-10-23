import type { Meta, StoryObj } from '@storybook/react';
import { CardType } from 'types/card';
import { MiniCardV1 } from './MiniCardV1';

const meta = {
    component: MiniCardV1,
    args: {
        link: { url: '', text: 'Tittel' },
        type: CardType.Product,
    },
} satisfies Meta<typeof MiniCardV1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Product: Story = {};

export const SituationHover: Story = {
    parameters: {
        pseudo: { hover: true },
    },
    args: {
        type: CardType.Situation,
    },
};

export const WithHeader: Story = {
    args: {
        header: 'Header',
    },
};

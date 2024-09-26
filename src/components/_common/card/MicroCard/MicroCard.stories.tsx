import type { Meta, StoryObj } from '@storybook/react';
import { CardType } from 'types/card';
import { MicroCard } from './MicroCard';

const meta = {
    component: MicroCard,
} satisfies Meta<typeof MicroCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        link: { url: '', text: 'MicroCard' },
        type: CardType.Product,
    },
};

export const Hover: Story = {
    parameters: { pseudo: { hover: true } },
    args: { ...Default.args },
};

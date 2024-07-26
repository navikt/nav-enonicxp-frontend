import type { Meta, StoryObj } from '@storybook/react';
import { CardType } from 'types/card';
import { MiniCardV1 } from './MiniCardV1';

const meta = {
    title: 'Components/Common/Card/MiniCardV1',
    component: MiniCardV1,
    args: {
        link: { url: '', text: 'Tittel' },
        type: CardType.Product,
    },
} satisfies Meta<typeof MiniCardV1>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Product: Story = {};

export const Situation: Story = {
    args: {
        type: CardType.Situation,
    },
};

export const WithHeader: Story = {
    args: {
        header: 'Header',
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { CardType } from 'types/card';
import { MiniCardV2 } from './MiniCardV2';

const meta = {
    title: 'Components/Common/Card/MiniCardV2',
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

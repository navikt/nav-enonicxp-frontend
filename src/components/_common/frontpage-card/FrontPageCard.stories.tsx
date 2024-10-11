import type { Meta, StoryObj } from '@storybook/react';

import { CardType } from 'types/card';
import { FrontPageCard } from './FrontPageCard';

const meta = {
    component: FrontPageCard,
} satisfies Meta<typeof FrontPageCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { path: '', title: 'Title', type: CardType.EmployerFrontpage },
};

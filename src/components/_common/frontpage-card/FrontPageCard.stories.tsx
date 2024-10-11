import type { Meta, StoryObj } from '@storybook/react';

import { CardType } from 'types/card';
import { FrontPageCard } from './FrontPageCard';

const meta = {
    component: FrontPageCard,
    args: { path: '', title: 'Title' },
} satisfies Meta<typeof FrontPageCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Person: Story = {
    args: { type: CardType.PersonFrontPage },
};

export const Employer: Story = {
    args: { type: CardType.EmployerFrontpage },
};

export const ProviderFrontpage: Story = {
    args: { type: CardType.ProviderFrontpage },
};

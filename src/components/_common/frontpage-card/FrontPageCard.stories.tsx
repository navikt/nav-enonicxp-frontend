import type { Meta, StoryObj } from '@storybook/react';

import { CardType } from 'types/card';
import { FrontPageCard } from './FrontPageCard';

const meta = {
    component: FrontPageCard,
    args: { path: '', title: 'Title' },
} satisfies Meta<typeof FrontPageCard>;

export default meta;

type Story = StoryObj<typeof meta>;

//I bruk på engelsk forside
export const Person: Story = {
    args: { type: CardType.PersonFrontPage },
};

export const PersonHover: Story = {
    args: { type: CardType.PersonFrontPage },
    parameters: {
        pseudo: { hover: true },
    },
};

export const Employer: Story = {
    args: { type: CardType.EmployerFrontpage },
};

export const EmployerHover: Story = {
    args: { type: CardType.EmployerFrontpage },
    parameters: {
        pseudo: { hover: true },
    },
};

export const Provider: Story = {
    args: { type: CardType.ProviderFrontpage },
};

export const ProviderHover: Story = {
    args: { type: CardType.ProviderFrontpage },
    parameters: {
        pseudo: { hover: true },
    },
};

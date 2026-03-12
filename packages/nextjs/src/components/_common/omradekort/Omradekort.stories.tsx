import type { Meta, StoryObj } from '@storybook/react';
import { Omradekort } from './Omradekort';

const meta = {
    component: Omradekort,
    args: { path: '' },
} satisfies Meta<typeof Omradekort>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Work: Story = {
    args: {
        title: 'Arbeid',
        area: 'work',
    },
};

export const Family: Story = {
    args: {
        title: 'Familie og barn',
        area: 'family',
    },
};

export const Health: Story = {
    args: {
        title: 'Helse og sykdom',
        area: 'health',
    },
};

export const Accessibility: Story = {
    args: {
        title: 'Hjelpemidler og tilrettelegging',
        area: 'accessibility',
    },
};

export const Pension: Story = {
    args: {
        title: 'Pensjon',
        area: 'pension',
    },
};

export const SocialCounselling: Story = {
    args: {
        title: 'Økonomisk sosialhjelp',
        area: 'social_counselling',
    },
};

export const Payments: Story = {
    args: {
        title: 'Utbetalinger',
        area: 'payments',
    },
};

export const Cases: Story = {
    args: {
        title: 'Dine saker',
        area: 'cases',
    },
};

export const EmploymentStatusForm: Story = {
    args: {
        title: 'Meldekort',
        area: 'employment-status-form',
    },
};

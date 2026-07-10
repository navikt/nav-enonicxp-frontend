import type { Meta, StoryObj } from '@storybook/react';
import { Omradekort } from './Omradekort';

const meta = {
    component: Omradekort,
    args: { path: '' },
} satisfies Meta<typeof Omradekort>;

export default meta;
type Story = StoryObj<typeof meta>;

const hovered: Partial<Story> = { parameters: { pseudo: { hover: true } } };

export const Work: Story = {
    args: { title: 'Arbeid', area: 'work' },
};

export const WorkHovered: Story = {
    ...Work,
    ...hovered,
};

export const Family: Story = {
    args: { title: 'Familie og barn', area: 'family' },
};

export const FamilyHovered: Story = {
    ...Family,
    ...hovered,
};

export const Health: Story = {
    args: { title: 'Helse og sykdom', area: 'health' },
};

export const HealthHovered: Story = {
    ...Health,
    ...hovered,
};

export const Accessibility: Story = {
    args: { title: 'Hjelpemidler og tilrettelegging', area: 'accessibility' },
};

export const AccessibilityHovered: Story = {
    ...Accessibility,
    ...hovered,
};

export const Pension: Story = {
    args: { title: 'Pensjon', area: 'pension' },
};

export const PensionHovered: Story = {
    ...Pension,
    ...hovered,
};

export const SocialCounselling: Story = {
    args: { title: 'Økonomisk sosialhjelp', area: 'social_counselling' },
};

export const SocialCounsellingHovered: Story = {
    ...SocialCounselling,
    ...hovered,
};

export const Payments: Story = {
    args: { title: 'Utbetalinger', area: 'payments' },
};

export const PaymentsHovered: Story = {
    ...Payments,
    ...hovered,
};

export const Cases: Story = {
    args: { title: 'Dine saker', area: 'cases' },
};

export const CasesHovered: Story = {
    ...Cases,
    ...hovered,
};

export const EmploymentStatusForm: Story = {
    args: { title: 'Meldekort', area: 'employment-status-form' },
};

export const EmploymentStatusFormHovered: Story = {
    ...EmploymentStatusForm,
    ...hovered,
};

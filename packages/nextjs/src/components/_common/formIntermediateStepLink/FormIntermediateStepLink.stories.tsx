import type { Meta, StoryObj } from '@storybook/react';

import { FormIntermediateStepLink } from './FormIntermediateStepLink';

const meta = {
    component: FormIntermediateStepLink,
} satisfies Meta<typeof FormIntermediateStepLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: 'Steg 1',
        href: '/example-path',
        isStepNavigation: true,
        analyticsComponent: 'mellomsteg',
        analyticsLinkGroup: 'Example Group',
        analyticsLabel: 'Example Step',
    },
};

export const WithExplanation: Story = {
    args: {
        ...Default.args,
        explanation: 'Dette er et eksempel på hva som kan stå her',
    },
};

export const WithFormNumber: Story = {
    args: {
        ...Default.args,
        formNumber: 'Nav 04-01.02',
    },
};

export const LanguageDisclaimer: Story = {
    args: {
        ...Default.args,
        label: 'Steg med språk',
        languageDisclaimer: 'Kun på bokmål',
    },
};

export const WithExplanationAndFormNumber: Story = {
    args: {
        ...WithExplanation.args,
        ...WithFormNumber.args,
    },
};

export const WithExplanationAndLanguageDisclaimer: Story = {
    args: {
        ...WithExplanation.args,
        ...LanguageDisclaimer.args,
    },
};

export const WithExplanationAndFormNumberAndLanguageDisclaimer: Story = {
    args: {
        ...WithExplanationAndFormNumber.args,
        ...LanguageDisclaimer.args,
    },
};

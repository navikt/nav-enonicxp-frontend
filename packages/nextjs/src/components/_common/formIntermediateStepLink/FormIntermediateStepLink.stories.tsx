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
        explanation: 'Dette er et eksempel på hva som kan stå her',
        href: '/example-path',
        isStepNavigation: true,
        analyticsComponent: 'mellomsteg',
        analyticsLinkGroup: 'Example Group',
        analyticsLabel: 'Example Step',
        formNumberStepData: 'Nav 04-01.02',
    },
};

export const LanguageDisclaimer: Story = {
    args: {
        ...Default.args,
        label: 'Steg med språk',
        languageDisclaimer: 'Kun på bokmål',
    },
};

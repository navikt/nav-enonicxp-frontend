import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AlertBox } from './AlertBox';

const meta = {
    component: AlertBox,
    args: { children: 'Dette er en AlertBox', variant: 'info' },
} satisfies Meta<typeof AlertBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        variant: 'success',
    },
};

export const Warning: Story = {
    args: {
        variant: 'warning',
    },
};

export const Info: Story = {
    args: {
        variant: 'info',
    },
};

// (Sonarlint liker ikke at en variabel heter Error)
export const ErrorVariant: Story = {
    args: {
        variant: 'error',
    },
};

export const Small: Story = {
    args: {
        size: 'small',
    },
};

export const Inline: Story = {
    args: {
        inline: true,
    },
};

export const InlineSmall: Story = {
    args: {
        inline: true,
        size: 'small',
    },
};

export const Short: Story = {
    args: {
        children: (
            <div>
                <p>AlertBox</p>
            </div>
        ),
    },
};

export const Long: Story = {
    args: {
        children: (
            <div>
                <h3>Lovendring om etterbetaling av barnetrygd</h3>
                <p>
                    Fra 1. juli 2024 er regelverket for etterbetaling av barnetrygd endret. Etter de
                    nye reglene kan barnetrygden bli etterbetalt for inntil tre måneder.
                </p>
                <p>
                    Søker du før 1. oktober 2024, vil saken din likevel bli behandlet etter gammelt
                    regelverk. Etter gammelt regelverk kan du få etterbetalt barnetrygd i inntil tre
                    år.
                </p>
            </div>
        ),
    },
};

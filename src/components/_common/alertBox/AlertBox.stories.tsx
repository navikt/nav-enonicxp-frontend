import React from 'react';
import { BodyLong, Heading } from '@navikt/ds-react';
import type { Meta, StoryObj } from '@storybook/react';
import { AlertBox } from './AlertBox';

const meta = {
    component: AlertBox,
    args: { variant: 'info' },
} satisfies Meta<typeof AlertBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Short: Story = {
    args: {
        children: 'AlertBox',
    },
};

export const Long: Story = {
    args: {
        children: (
            <>
                <Heading size="medium" spacing>
                    Lovendring om etterbetaling av barnetrygd
                </Heading>
                <BodyLong spacing>
                    Fra 1. juli 2024 er regelverket for etterbetaling av barnetrygd endret. Etter de
                    nye reglene kan barnetrygden bli etterbetalt for inntil tre måneder.
                </BodyLong>
                <BodyLong spacing>
                    Søker du før 1. oktober 2024, vil saken din likevel bli behandlet etter gammelt
                    regelverk. Etter gammelt regelverk kan du få etterbetalt barnetrygd i inntil tre
                    år.
                </BodyLong>
            </>
        ),
    },
};

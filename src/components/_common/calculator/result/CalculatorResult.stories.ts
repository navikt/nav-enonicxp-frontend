import type { Meta, StoryObj } from '@storybook/react';
import { CalculatorResult } from './CalculatorResult';

const meta = {
    title: 'Components/Common/Calculator/Result',
    component: CalculatorResult,
} satisfies Meta<typeof CalculatorResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        summaryText: 'Resultatet er: ',
        sum: 100,
        useThousandSeparator: true,
        errorMessage: '',
    },
};

export const Error: Story = {
    args: {
        summaryText: 'Resultatet er: ',
        sum: 100,
        useThousandSeparator: true,
        errorMessage: 'Feilmelding',
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { KalkulatorResultat } from './KalkulatorResultat';

const meta = {
    component: KalkulatorResultat,
} satisfies Meta<typeof KalkulatorResultat>;

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

export const ErrorVariant: Story = {
    args: {
        summaryText: 'Resultatet er: ',
        sum: 100,
        useThousandSeparator: true,
        errorMessage: 'Feilmelding',
    },
};

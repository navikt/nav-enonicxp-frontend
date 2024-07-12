import type { Meta, StoryObj } from '@storybook/react';
import { CalculatorField } from './CalculatorField';

const meta = {
    title: 'Components/Common/Calculator/Field',
    component: CalculatorField,
} satisfies Meta<typeof CalculatorField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        field: {
            inputField: {
                explanation: 'Enter the principal amount',
                label: 'Principal',
                variableName: 'principal',
            },
        },
        onChange: () => {},
        value: 200,
        autoComplete: false,
    },
};

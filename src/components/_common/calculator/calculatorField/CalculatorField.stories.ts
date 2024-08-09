import type { Meta, StoryObj } from '@storybook/react';
import { CalculatorField } from './CalculatorField';

const meta = {
    component: CalculatorField,
} satisfies Meta<typeof CalculatorField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        field: {
            inputField: {
                label: 'Utgift',
                variableName: 'utgift',
            },
        },
        onChange: () => {},
        value: 100,
        autoComplete: false,
    },
};

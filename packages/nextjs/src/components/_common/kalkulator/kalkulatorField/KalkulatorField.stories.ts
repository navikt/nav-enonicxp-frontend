import type { Meta, StoryObj } from '@storybook/react';
import { KalkulatorField } from './KalkulatorField';

const meta = {
    component: KalkulatorField,
} satisfies Meta<typeof KalkulatorField>;

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

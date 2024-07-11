import type { Meta, StoryObj } from '@storybook/react';
import { Calculator } from './Calculator';

const meta = {
    title: 'Components/Common/Calculator',
    component: Calculator,
} satisfies Meta<typeof Calculator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        calculatorData: {
            fields: [],
            calculationScript: 'test',
            useThousandSeparator: false,
            summaryText: 'testtest',
        },
    },
};

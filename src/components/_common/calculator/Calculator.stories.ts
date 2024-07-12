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
            fields: [
                {
                    inputField: {
                        explanation: 'Enter the principal amount',
                        label: 'Principal',
                        variableName: 'principal',
                    },
                },
                {
                    dropdownField: {
                        explanation: 'Select the interest rate',
                        label: 'Interest Rate',
                        variableName: 'interestRate',
                        optionItems: [
                            { label: '1%', value: 0.01 },
                            { label: '2%', value: 0.02 },
                            { label: '3%', value: 0.03 },
                        ],
                    },
                },
                {
                    globalValue: {
                        variableName: 'fixedFee',
                        value: 50,
                    },
                },
            ],
            calculationScript: `
                const principal = fields['principal'].value;
                const interestRate = fields['interestRate'].value;
                const fixedFee = fields['fixedFee'].value;
                
                const interest = principal * interestRate;
                const total = principal + interest + fixedFee;
                
                return {
                    interest,
                    total
                };
            `,
            useThousandSeparator: true,
            summaryText:
                'This calculator helps you determine the total amount including interest and fees.',
        },
    },
};

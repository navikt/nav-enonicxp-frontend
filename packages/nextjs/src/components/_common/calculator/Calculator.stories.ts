import type { Meta, StoryObj } from '@storybook/react';
import { Calculator } from './Calculator';

const meta = {
    component: Calculator,
} satisfies Meta<typeof Calculator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        calculatorData: {
            fields: [
                {
                    dropdownField: {
                        label: 'Antall barn du har utgifter til barnepass for',
                        variableName: 'antallBarn',
                        optionItems: [
                            { label: '1 barn', value: 1 },
                            { label: '2 barn', value: 2 },
                            { label: '3 barn eller flere', value: 3 },
                        ],
                    },
                },
                {
                    inputField: {
                        label: 'Utgifter barnepass, ikke inkludert kostpenger',
                        variableName: 'utgifter',
                    },
                },
                {
                    inputField: {
                        label: 'Kontantstøtte per måned (hvis du får)',
                        variableName: 'kontantstotte',
                    },
                },
                {
                    globalValue: {
                        variableName: 'barnetilsyn1Barn',
                        value: 4650,
                    },
                },
                {
                    globalValue: {
                        variableName: 'barnetilsyn2Barn',
                        value: 6066,
                    },
                },
                {
                    globalValue: {
                        variableName: 'barnetilsyn3EllerFlereBarn',
                        value: 6875,
                    },
                },
            ],
            calculationScript: `
                const actualExpenses = Math.round((utgifter - kontantstotte) * 0.64)

                if (actualExpenses <= 0) {
                return 0;
                }

                if (antallBarn === 1) {
                    return Math.min(barnetilsyn1Barn, actualExpenses);
                } else if (antallBarn === 2) {
                    return Math.min(barnetilsyn2Barn, actualExpenses);
                } else if (antallBarn > 2) {
                    return Math.min(barnetilsyn3EllerFlereBarn, actualExpenses);
                }

                return 0
            `,
            useThousandSeparator: true,
            summaryText: `
                Du får [result] kr i stønad til pass av barn per måned.
                Når vi har behandlet søknaden din om stønad til pass av barn, vil du få vite hva du får utbetalt. Hvis barnet ikke har barnepass på fulltid vil støtten til barnepass bli lavere. Det samme gjelder hvis du har tiltak på deltid.
            `,
        },
    },
};

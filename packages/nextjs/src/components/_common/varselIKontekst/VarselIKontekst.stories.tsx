import type { Meta, StoryObj } from '@storybook/react';
import { VarselIKontekst } from './VarselIKontekst';

const meta = {
    component: VarselIKontekst,
    args: {
        data: {
            type: 'information',
            text: 'Dette er en VarselIKontekst',
        },
    },
} satisfies Meta<typeof VarselIKontekst>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Information: Story = {};

export const Critical: Story = {
    args: {
        data: {
            ...meta.args.data,
            type: 'critical',
        },
    },
};

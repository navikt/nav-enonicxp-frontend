import type { Meta, StoryObj } from '@storybook/nextjs';

import { OversiktFiltersSummary } from './OversiktFiltersSummary';

const meta = {
    component: OversiktFiltersSummary,
} satisfies Meta<typeof OversiktFiltersSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { antallTreff: 1, totaltAntall: 2 } };
export const NoHits: Story = { args: { antallTreff: 0, totaltAntall: 2 } };

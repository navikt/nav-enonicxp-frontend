import type { Meta, StoryObj } from '@storybook/react';
import { LenkeStandalone } from 'components/_common/lenke/lenkeStandalone/LenkeStandalone';

const meta = {
    component: LenkeStandalone,
    args: { children: 'Trykk her', href: '/' },
} satisfies Meta<typeof LenkeStandalone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithChevron: Story = { args: { withChevron: true } };
export const WithArrow: Story = { args: { withArrow: true } };

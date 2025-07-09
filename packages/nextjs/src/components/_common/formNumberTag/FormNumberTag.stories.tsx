import type { Meta, StoryObj } from '@storybook/react';
import { FormNumberTag } from './FormNumberTag';

const meta = {
    component: FormNumberTag,
    args: {
        formNumber: 'NAV 44-23.69',
    },
} satisfies Meta<typeof FormNumberTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};

export const Selected: Story = {
    args: { selected: true },
};

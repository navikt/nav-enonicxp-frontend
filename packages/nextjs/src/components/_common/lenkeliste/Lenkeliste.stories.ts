import type { Meta, StoryObj } from '@storybook/react';
import { Lenkeliste } from './Lenkeliste';

const meta = {
    component: Lenkeliste,
    args: {
        lenker: [
            { url: 'test', text: 'Lorem' },
            { url: 'test', text: 'Ipsum' },
            { url: 'test', text: 'Dolor' },
        ],
    },
} satisfies Meta<typeof Lenkeliste>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        listType: 'default',
    },
};

export const Chevron: Story = {
    args: {
        listType: 'chevron',
    },
};

export const Bullet: Story = {
    args: {
        listType: 'bulletlist',
    },
};

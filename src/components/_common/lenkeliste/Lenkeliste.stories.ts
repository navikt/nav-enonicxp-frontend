import type { Meta, StoryObj } from '@storybook/react';
import { Lenkeliste } from './Lenkeliste';

const meta = {
    title: 'Components/Common/Lenkeliste',
    component: Lenkeliste,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Lenkeliste>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Chevron: Story = {
    args: {
        lenker: [
            { url: 'test', text: 'test' },
            { url: 'test', text: 'test' },
            { url: 'test', text: 'test' },
        ],
        listType: 'chevron',
    },
};

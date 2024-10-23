import type { Meta, StoryObj } from '@storybook/react';

import { ComponentType } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { ReadMorePart } from './ReadMorePart';

const meta = {
    component: ReadMorePart,
    args: { type: ComponentType.Part, descriptor: PartType.ReadMore, path: '' },
} satisfies Meta<typeof ReadMorePart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        config: {
            title: 'Read More',
            html: {
                processedHtml:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                macros: [],
            },
        },
    },
};

export const Opened: Story = {
    args: {
        config: {
            ...Default.args.config,
            isOpen: true,
        },
    },
};

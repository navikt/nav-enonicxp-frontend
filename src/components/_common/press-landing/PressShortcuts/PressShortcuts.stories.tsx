import type { Meta, StoryObj } from '@storybook/react';

import { PressShortcuts } from './PressShortcuts';

const meta = {
    component: PressShortcuts,
} satisfies Meta<typeof PressShortcuts>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        page: {
            language: 'no',
            data: {
                shortcuts: {
                    data: {
                        sectionContents: [
                            {
                                _path: '',
                                displayName: 'Statistikk, analyse og FoU',
                            },
                            {
                                _path: '',
                                displayName: 'Innsyn i offentlig journal',
                            },
                        ],
                    },
                },
            },
        },
    },
};

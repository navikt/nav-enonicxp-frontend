import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { MacroType } from 'types/macro-props/_macros-common';

const meta = {
    title: 'Components/Common/Accordion',
    component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        accordion: [
            {
                title: 'Section 1',
                anchorId: 'section-1',
                html: {
                    processedHtml: '<p>This is some processed HTML content for section 1.</p>',
                    macros: [
                        {
                            ref: 'macro-1',
                            name: MacroType.AlertBox,
                        },
                        {
                            ref: 'macro-2',
                            name: MacroType.Button,
                        },
                    ],
                },
            },
            {
                title: 'Section 2',
                html: {
                    processedHtml:
                        '<p>This is some processed HTML content for section 2 without an anchor ID.</p>',
                    macros: [
                        {
                            ref: 'macro-3',
                            name: MacroType.Video,
                        },
                    ],
                },
            },
        ],
    },
};

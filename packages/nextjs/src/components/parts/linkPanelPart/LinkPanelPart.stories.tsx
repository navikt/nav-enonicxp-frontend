import type { Meta, StoryObj } from '@storybook/react';
import { PartType } from 'types/component-props/parts';
import { ComponentType } from 'types/component-props/_component-common';
import { MediaType } from 'types/media';
import { LinkPanelPart } from './LinkPanelPart';

const meta = {
    component: LinkPanelPart,
    args: {
        descriptor: PartType.LinkPanel,
        type: ComponentType.Part,
        path: 'path',
        config: {
            link: {
                _selected: 'external',
                internal: {
                    target: {
                        _path: 'path',
                        displayName: 'displayName',
                    },
                },
                external: { url: 'url', text: 'text' },
            },
        },
    },
} satisfies Meta<typeof LinkPanelPart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Descriptor og type må være henholdsvis LinkPanel og Part for denne komponenten.',
            },
        },
    },
};

export const Icon: Story = {
    args: {
        config: {
            ...meta.args.config,
            icon: {
                type: MediaType.Vector,
                mediaUrl: 'placeholder',
            },
        },
    },
};

export const IconVertical: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Denne funksjonaliteten brukes ikke på nav.no. per 21.10.24, men beholdes for å være bakoverkompatibel med visning frem til arkiv er på plass.',
            },
        },
    },
    args: {
        config: {
            ...meta.args.config,
            icon: {
                type: MediaType.Vector,
                mediaUrl: 'placeholder',
            },
            variant: {
                _selected: 'verticalWithBgColor',
                vertical: {},
                verticalWithBgColor: {
                    iconBg: {
                        color: 'orange',
                    },
                    iconJustify: 'flex-start',
                },
            },
        },
    },
};

import type { Meta, StoryObj } from '@storybook/nextjs';
import { ProductTaxonomy } from 'types/taxonomies';
import { ContentType } from 'types/content-props/_content-common';
import { MediaType } from 'types/media';
import { Area } from 'types/areas';
import { ComponentType } from 'types/component-props/_component-common';
import { PartType } from 'types/component-props/parts';
import { AreapageSituationCardPart } from './AreapageSituationCardPart';

const meta = {
    component: AreapageSituationCardPart,
} satisfies Meta<typeof AreapageSituationCardPart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: ComponentType.Part,
        path: '',
        descriptor: PartType.AreapageSituationCard,
        config: {
            disabled: false,
            target: {
                _id: '12345',
                data: {
                    title: 'Har blitt sykmeldt',
                    taxonomy: [ProductTaxonomy.BENEFITS],
                    illustration: {
                        type: ContentType.Pictograms,
                        data: {
                            icons: [{ icon: { type: MediaType.Vector, mediaUrl: 'placeholder' } }],
                        },
                    },
                    area: [Area.ALL],
                },
                displayName: 'Test Area',
                type: ContentType.SituationPage,
                language: 'no',
                _path: '',
            },
        },
    },
};

export const Hover: Story = {
    args: {
        ...Default.args,
    },
    parameters: {
        pseudo: {
            hover: true,
        },
    },
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        config: {
            ...Default.args?.config,
            disabled: true,
        },
    },
};

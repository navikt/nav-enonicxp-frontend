import type { Meta, StoryObj } from '@storybook/react';

import { ContentType } from 'types/content-props/_content-common';
import { MediaType } from 'types/media';
import { ThemedPageHeader } from './ThemedPageHeader';

const meta = {
    component: ThemedPageHeader,
} satisfies Meta<typeof ThemedPageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        contentProps: {
            type: ContentType.FormIntermediateStepPage,
            displayName: 'Søknad om arbeidsavklaringspenger (AAP)',
            modifiedTime: '2023-07-03T07:02:26.724412Z',
            language: 'no',
            data: {
                title: 'Søknad om arbeidsavklaringspenger (AAP)',
                illustration: {
                    type: ContentType.Pictograms,
                    data: {
                        icons: [{ icon: { type: MediaType.Vector, mediaUrl: 'placeholder' } }],
                    },
                },
                taxonomy: [],
            },
        },
    },
};

export const WithTimeStamp: Story = {
    args: {
        contentProps: {
            ...Default.args.contentProps,
        },
        showTimeStamp: true,
    },
};

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
            displayName: 'Themed Page Header',
            modifiedTime: '2023-07-03T07:02:26.724412Z',
            language: 'no',
            data: {
                title: 'Themed Page Header',
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

export const OverviewPage: Story = {
    args: {
        contentProps: {
            ...Default.args.contentProps,
            type: ContentType.Overview,
        },
        showTimeStamp: false,
    },
};

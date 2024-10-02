import type { Meta, StoryObj } from '@storybook/react';

import { ContentType } from 'types/content-props/_content-common';
import { MediaType } from 'types/media';
import { Audience } from 'types/component-props/_mixins';
import { GeneralPageHeader } from './GeneralPageHeader';

const meta = {
    component: GeneralPageHeader,
} satisfies Meta<typeof GeneralPageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        pageProps: {
            type: ContentType.SituationPage,
            displayName: 'displayName',
            language: 'no',
            data: {
                title: 'General Page Header',
                illustration: {
                    type: ContentType.Pictograms,
                    data: {
                        icons: [{ icon: { type: MediaType.Vector, mediaUrl: 'placeholder' } }],
                    },
                },
                taxonomy: [],
                audience: {
                    _selected: Audience.PERSON,
                    [Audience.PERSON]: {},
                    [Audience.EMPLOYER]: {},
                    [Audience.PROVIDER]: {},
                },
                customCategory: 'customCategory',
                ingress: 'ingress',
                hideIngress: false,
            },
        },
    },
};

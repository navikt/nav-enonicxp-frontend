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
            type: ContentType.ProductPage,
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
                ingress:
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                hideIngress: false,
            },
        },
    },
};

export const HideIngress: Story = {
    args: {
        pageProps: {
            ...Default.args.pageProps,
            data: {
                ...Default.args.pageProps.data,
                hideIngress: true,
            },
        },
    },
};

export const GuidePage: Story = {
    args: {
        pageProps: {
            ...Default.args.pageProps,
            type: ContentType.GuidePage,
        },
    },
};

export const SituationPage: Story = {
    args: {
        pageProps: {
            ...Default.args.pageProps,
            type: ContentType.SituationPage, //En hack med negativ margin gjør at ingressen krasjer med overskriften i Storybook (.reduceMarginBottom)
        },
    },
};

export const CustomCategory: Story = {
    args: {
        pageProps: {
            ...Default.args.pageProps,
            data: {
                ...Default.args.pageProps.data,
                customCategory: 'Egendefinert kategori',
            },
        },
    },
};

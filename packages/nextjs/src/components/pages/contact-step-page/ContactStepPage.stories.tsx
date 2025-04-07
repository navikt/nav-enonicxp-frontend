import React from 'react';
import { Provider } from 'react-redux';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { mockStore } from 'store/store';
import { ContentType } from 'types/content-props/_content-common';
import { MediaType } from 'types/media';
import { ContactStepPage } from './ContactStepPage';

const withStore: Decorator = (Story) => (
    <Provider store={mockStore}>
        <Story />
    </Provider>
);

const meta = {
    component: ContactStepPage,
    decorators: [withStore],
} satisfies Meta<typeof ContactStepPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        _path: 'placeholder',
        type: ContentType.ContactStepPage,
        data: {
            textAboveTitle: 'Forrige side',
            title: 'Tittel',
            illustration: {
                type: ContentType.Pictograms,
                data: {
                    icons: [
                        {
                            icon: {
                                type: MediaType.Vector,
                                mediaUrl: 'placeholder',
                            },
                        },
                    ],
                },
            },
            editorial: '<p>Hva vil du gjøre?</p>',
            linkPanels: [
                {
                    target: {
                        _path: 'placeholder',
                        displayName: 'Ledige jobber',
                    },
                    text: 'Finn ledige stillinger',
                    ingress: 'Finn ledige stillinger, registrer CV og jobbprofil på Arbeidsplassen',
                },
                {
                    target: {
                        _path: 'placeholder',
                        displayName: 'Nav hjelpemiddelsentral',
                    },
                },
            ],
            backLink: {
                target: {
                    _path: 'placeholder',
                    displayName: 'Tilbake',
                },
                text: 'Tilbakelenke',
            },
        },
    },
};

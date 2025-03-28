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
        _path: 'test',
        type: ContentType.ContactStepPage,
        data: {
            title: 'Skriv til oss',
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
            html: '<p>Hva vil du gjøre?</p>',
            linkPanelsHeading: 'Velg tema',
            linkPanelsSubHeading: 'Du blir bedt om å logge inn',
            linkPanels: [
                {
                    target: {
                        _path: '',
                        displayName: 'Ledige jobber',
                    },
                    text: 'Finn ledige stillinger',
                    ingress: 'Finn ledige stillinger, registrer CV og jobbprofil på Arbeidsplassen',
                },
                {
                    target: {
                        _path: '',
                        displayName: 'Nav hjelpemiddelsentral',
                    },
                },
            ],
            backLink: {
                target: {
                    _path: '/person/kontakt-oss',
                    displayName: 'Tilbake',
                },
                text: 'Tilbake til kontakt',
            },
        },
    },
};

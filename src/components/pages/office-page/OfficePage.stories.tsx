import React from 'react';
import { Provider } from 'react-redux';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { mockStore } from 'store/store';
import { OfficePage } from './OfficePage';

const withStore: Decorator = (Story) => (
    <Provider store={mockStore}>
        <Story />
    </Provider>
);

const meta = {
    title: 'Components/Pages/OfficePage',
    component: OfficePage,
    decorators: [withStore],
    args: {
        _id: '1d1b5ede-23a5-4ae1-b78c-8becfade0a9d',
        // _name: 'nav-st.hanshaugen',
        _path: '/www.nav.no/kontor/nav-st.hanshaugen',
        // creator: 'user:system:su',
        // modifier: 'user:system:su',
        createdTime: '2024-07-15T19:01:22.283868Z',
        modifiedTime: '2024-07-15T19:01:22.283868Z',
        // owner: 'user:system:su',
        type: ContentType.OfficePage,
        displayName: 'NAV St. Hanshaugen',
        // hasChildren: false,
        language: 'no',
        // valid: true,
        // childOrder: 'modifiedtime DESC',
        data: {
            title: 'NAV St. Hanshaugen',
            officeNorgData: {
                _selected: 'data',
                data: {
                    enhetNr: '0313',
                    navn: 'NAV St. Hanshaugen',
                    status: 'Aktiv',
                    organisasjonsnummer: '993585653',
                    underEtableringDato: '1970-01-01',
                    aktiveringsdato: '1970-01-01',
                    beliggenhet: {
                        type: 'stedsadresse',
                        postnummer: '0167',
                        poststed: 'OSLO',
                        gatenavn: 'Pilestredet',
                        husnummer: '56',
                    },
                    postadresse: {
                        type: 'stedsadresse',
                        postnummer: '0614',
                        poststed: 'OSLO',
                        // postboksnummer: '304',
                        // postboksanlegg: 'Alnabru',
                    },
                    brukerkontakt: {
                        spraakdrakt: 'NB',
                        publikumskanaler: {
                            // beskrivelse?: string;
                            // telefon?: string;
                            // epost?: string;
                            sortOrder: 1,
                        },

                        publikumsmottak: [
                            {
                                officeType: 'LOKAL',
                                besoeksadresse: {
                                    type: 'stedsadresse',
                                    postnummer: '0167',
                                    poststed: 'Oslo',
                                    gatenavn: 'Pilestredet',
                                    husnummer: '56',
                                },
                                aapningstider: [
                                    {
                                        dag: 'Mandag',
                                        fra: '09:00',
                                        til: '15:00',
                                        kommentar: '',
                                        stengt: 'false',
                                        kunTimeavtale: 'false',
                                    },
                                    {
                                        dag: 'Tirsdag',
                                        fra: '09:00',
                                        til: '15:00',
                                        kommentar: '',
                                        stengt: 'false',
                                        kunTimeavtale: 'false',
                                    },
                                    {
                                        dag: 'Onsdag',
                                        fra: '09:00',
                                        til: '15:00',
                                        kommentar: '',
                                        stengt: 'false',
                                        kunTimeavtale: 'false',
                                    },
                                    {
                                        dag: 'Torsdag',
                                        fra: '09:00',
                                        til: '15:00',
                                        kommentar: '',
                                        stengt: 'false',
                                        kunTimeavtale: 'false',
                                    },
                                    {
                                        dag: 'Fredag',
                                        fra: '09:00',
                                        til: '15:00',
                                        kommentar: '',
                                        stengt: 'false',
                                        kunTimeavtale: 'false',
                                    },
                                ],
                                stedsbeskrivelse: 'Bislett',
                            },
                        ],
                        brukertjenesteTilbud: {
                            tjenester: [
                                {
                                    type: 'FLYKTNINGTJENESTE',
                                },
                                {
                                    type: 'KOMMUNALT_FRIKORT_HELSETJENESTER',
                                },
                                {
                                    type: 'PRIVATOKONOMI_FORVALTNING',
                                },
                            ],
                        },
                        sosialhjelp: {},
                        informasjonUtbetalinger: '',
                        // skriftspraak: 'NB',
                    },
                    type: 'LOKAL',
                    // checksum: '4e28d956-7c93-364f-b52d-cd28dc4bd2e5',
                },
            },
        },
        // x: {
        //     'no-nav-navno': {
        //         previewOnly: {
        //             previewOnly: false,
        //         },
        //     },
        // },
        page: undefined, //TODO: ?
        // attachments: {},
        publish: {
            from: '2024-07-18T13:25:23.703Z',
            first: '2024-07-15T19:01:35.339Z',
        },
    },
} satisfies Meta<typeof OfficePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };

// export const English: Story = {
//     // args: {
//     //     language: 'en',
//     // },
// };

// export const EditorView: Story = {
//     // args: {
//     //     editorView: 'edit',
//     // },
// };

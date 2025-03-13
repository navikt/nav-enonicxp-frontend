import React from 'react';
import { Provider } from 'react-redux';
import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { mockStore } from 'store/store';
import { ContactStepPage } from './ContactStepPage';

const withStore: Decorator = (Story) => (
    <Provider store={mockStore}>
        <Story />
    </Provider>
);

const meta = {
    component: ContactStepPage,
    decorators: [withStore],
    //Ikke en komplett side. Ikke sikkert vi skal sette opp hele sider i storybook.
    //Bør kanskje finne en bedre måte å gjøre dette på om vi skal prøve å ha hele sider i storybook.
    //Sjekk ut: https://storybook.js.org/docs/writing-stories/build-pages-with-storybook
    args: {
        _id: '4b4f44c8-d82c-4046-80e8-2b49ff9feca3',
        _name: 'skrivtiloss',
        _path: '/www.nav.no/tania/skrivtiloss',
        creator: 'user:system:su',
        modifier: 'user:system:su',
        createdTime: '2025-03-06T09:12:39.492046Z',
        modifiedTime: '2025-03-13T11:26:18.994311Z',
        owner: 'user:system:su',
        type: 'no.nav.navno:contact-step-page',
        displayName: 'Skriv til oss',
        hasChildren: true,
        language: 'no',
        valid: true,
        childOrder: 'modifiedtime DESC',
        data: {
            audience: {
                person: {},
                _selected: 'person',
            },
            steps: {
                nextStep: {
                    _selected: 'internal',
                    internal: {
                        internalContent: '5f679435-e468-4196-aa4a-5c86be9438a0',
                    },
                },
                label: 'Test',
            },
            customPath: '/test-kontaktside',
            title: 'Skriv til oss',
            textAboveTitle: 'Kontakt oss',
            ingress: 'yrdyr',
            html: '<p>Hva vil du gjøre?</p>\n',
            target: '4b4f44c8-d82c-4046-80e8-2b49ff9feca3',
            text: 'Skriv til oss om noe annet',
            link: {
                internal: {
                    target: '419e1783-25af-4513-aebb-2cce0b6bd7da',
                    text: 'Kontakt oss på en annen måte',
                },
                _selected: 'internal',
            },
            links: [
                {
                    label: 'Melde fra om endringer i saken din',
                    explanation:
                        'Når du får støtte fra Nav, må du melde fra om endringer som kan ha betydning for saken din. Det kan for eksempel være endringer i inntekt, bosted, jobb- eller familiesituasjon, eller ferie og opphold i utlandet.',
                    link: {
                        internal: {
                            internalContent: {
                                createdTime: '2025-03-13T11:18:33.082857Z',
                                displayName: '"Melde fra om endringer i saken din"',
                                language: 'no',
                                modifiedTime: '2025-03-13T11:23:51.173Z',
                                publish: {
                                    first: '2025-03-13T11:24:01.903Z',
                                    from: '2025-03-13T11:24:01.903Z',
                                },
                                type: 'no.nav.navno:contact-step-page',
                                _id: 'ad33a6f6-403b-4ba4-bd7e-04cc25a473f2',
                                _path: '/privatperson/meldeifraomendringer',
                            },
                        },
                        _selected: 'internal',
                    },
                },
                {
                    label: 'Få svar på spørsmål',
                    explanation:
                        'Du kan blant annet stille oss spørsmål om saken din, hvilke rettigheter du har, hvilke regler som gjelder og hvordan du går frem for å søke.',
                    link: {
                        internal: {
                            internalContent: {
                                createdTime: '2025-03-13T11:18:33.082857Z',
                                displayName: 'Skriv til oss',
                                language: 'no',
                                modifiedTime: '2025-03-13T11:23:51.173Z',
                                publish: {
                                    first: '2025-03-13T11:24:01.903Z',
                                    from: '2025-03-13T11:24:01.903Z',
                                },
                                type: 'no.nav.navno:contact-step-page',
                                _id: '"4b4f44c8-d82c-4046-80e8-2b49ff9feca3"',
                                _path: '/privatperson/velgpengestotteellertjeneste',
                            },
                        },
                        _selected: 'internal',
                    },
                },
            ],
        },
        x: {
            'no-nav-navno': {
                redirectToLayer: {},
                virtualParent: {},
                previewOnly: {},
                searchOrder: {},
            },
        },
        page: {},
        attachments: {},
        publish: {
            from: '2025-03-11T09:40:07.350Z',
            first: '2025-03-11T09:40:07.350Z',
        },
    },
} satisfies Meta<typeof ContactStepPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const English: Story = {
    args: {
        language: 'en',
    },
};

export const EditorView: Story = {
    args: {
        editorView: 'edit',
    },
};

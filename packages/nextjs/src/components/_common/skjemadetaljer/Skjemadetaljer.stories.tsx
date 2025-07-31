import type { Meta, StoryObj } from '@storybook/react';
import { SkjemadetaljerData } from 'types/content-props/skjemadetaljer';
import { Skjemadetaljer } from './Skjemadetaljer';

const baseSkjemadetaljer = {
    formType: [
        {
            _selected: 'complaint',
            application: { variations: [{ label: 'Søk om tolk' }] },
            complaint: {
                variations: [
                    {
                        type: 'appeal',
                        label: 'Søk om tolk',
                        link: {
                            _selected: 'external',
                            internal: { target: { _path: '', displayName: '' } },
                            external: { url: '', text: '' },
                        },
                    },
                ],
            },
            addendum: {
                variations: [{ label: 'Tillegg' }],
            },
        },
    ],
    alerts: [],
    title: 'Søk om tolk for første gang',
    ingress: {
        processedHtml:
            'Søknaden skal brukes hvis du søker om tolk første gang. Hvis du tidligere har søkt og fått innvilget tolk, kan du bruke bestillingsløsningen neste gang du trenger tolk.',
        macros: [],
    },
} satisfies SkjemadetaljerData;

const meta = {
    component: Skjemadetaljer,
    args: {
        skjemadetaljer: baseSkjemadetaljer,
        displayConfig: { showTitle: true, showIngress: true },
    },
} satisfies Meta<typeof Skjemadetaljer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LanguageDisclaimer: Story = {
    args: {
        skjemadetaljer: {
            ...baseSkjemadetaljer,
            languageDisclaimer: 'Språkdisclaimer',
        },
    },
};

export const WithFormNumbers: Story = {
    args: {
        skjemadetaljer: {
            ...baseSkjemadetaljer,
            formNumbers: ['NAV 01-01.01', 'NAV 01-01.02', 'NAV 01-01.03a', 'NAV 01-01.03b'],
        },
        formNumberSelected: 'nav 01-01.03a',
        displayConfig: { showTitle: true, showIngress: true, showFormNumbers: true },
    },
};

export const Alerts: Story = {
    args: {
        skjemadetaljer: {
            ...baseSkjemadetaljer,
            alerts: [
                {
                    data: {
                        type: 'information',
                        text: 'Dette er informasjon',
                        target: {
                            _selected: 'targetContent',
                            formDetails: { targetContent: '', _selected: 'targetContent' },
                        },
                    },
                },
            ],
        },
    },
};

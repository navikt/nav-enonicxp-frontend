import type { Meta, StoryObj } from '@storybook/react';
import { FormDetails } from 'components/_common/form-details/FormDetails';

const meta = {
    component: FormDetails,
    args: {
        formDetails: {
            alerts: [],
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
            title: 'Søk om tolk for første gang',
            ingress: {
                processedHtml:
                    'Søknaden skal brukes hvis du søker om tolk første gang. Hvis du tidligere har søkt og fått innvilget tolk, kan du bruke bestillingsløsningen neste gang du trenger tolk.',
                macros: [],
            },
        },
        displayConfig: { showTitle: true, showIngress: true },
    },
} satisfies Meta<typeof FormDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LanguageDisclaimer: Story = {
    args: {
        formDetails: {
            languageDisclaimer: 'Språkdisclaimer',
        },
    },
};

export const Alerts: Story = {
    args: {
        formDetails: {
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

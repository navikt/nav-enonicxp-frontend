import { ContentProps, ContentType } from 'types/content-props/_content-common';
import type { Meta, StoryObj } from '@storybook/react';

import { PressShortcuts } from './PressShortcuts';

const pageMock: ContentProps = {
    _id: 'id',
    _path: 'path',
    createdTime: '',
    displayName: 'displayname',
    language: 'no',
    modifiedTime: '',
    type: ContentType.TemplatePage,
    data: {},
};

const meta = {
    component: PressShortcuts,
    args: {
        page: {
            language: 'no',
            data: {
                shortcuts: {
                    ...pageMock,
                    type: ContentType.ContentList,
                    data: {
                        sectionContents: [
                            {
                                ...pageMock,
                                _path: 'statistikk-analyse-og-fou',
                                displayName: 'Statistikk, analyse og FoU',
                            },
                            {
                                ...pageMock,
                                _path: 'innsyn',
                                displayName: 'Innsyn i offentlige dokumenter og opplysninger',
                            },
                            {
                                ...pageMock,
                                _path: 'kontakt-direktoratet',
                                displayName: 'Pressebilder og logopakke',
                            },
                        ],
                    },
                },
            },
        },
    },
} satisfies Meta<typeof PressShortcuts>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from '@storybook/react';

import { ContentType } from 'types/content-props/_content-common';
import { PressNewsItem } from './PressNewsItem';

const meta = {
    component: PressNewsItem,
} satisfies Meta<typeof PressNewsItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        newsItem: {
            _path: '',
            language: 'no',
            type: ContentType.MainArticle,
            displayName: '1 av 5 står utenfor arbeidslivet',
            data: {
                ingress:
                    '685 000 personer mellom 20 og 66 år sto utenfor arbeid eller utdanning ved utgangen av 2023, viser nye tall fra NAV.',
            },
            createdTime: '2023-03-01T00:00:00Z',
            publish: { from: '2023-03-02T00:00:00Z', first: '2023-03-03T00:00:00Z' },
        },
    },
};

export const News: Story = {
    args: {
        newsItem: {
            _path: '',
            language: 'no',
            type: ContentType.MainArticle,
            displayName: '1 av 5 står utenfor arbeidslivet',
            data: {
                contentType: 'news',
                ingress:
                    '685 000 personer mellom 20 og 66 år sto utenfor arbeid eller utdanning ved utgangen av 2023, viser nye tall fra NAV.',
            },
            createdTime: '2023-03-01T00:00:00Z',
            publish: { from: '2023-03-02T00:00:00Z', first: '2023-03-03T00:00:00Z' },
        },
    },
};

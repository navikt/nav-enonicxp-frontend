import type { Meta, StoryObj } from '@storybook/react';

import { ContentType } from 'types/content-props/_content-common';
import { PressNewsItem } from './PressNewsItem';

const meta = {
    component: PressNewsItem,
    args: {
        newsItem: {
            _path: '',
            language: 'no',
            type: ContentType.MainArticle,
            displayName: '1 av 5 står utenfor arbeidslivet',
            data: {
                ingress:
                    '685 000 personer mellom 20 og 66 år sto utenfor arbeid eller utdanning ved utgangen av 2023, viser nye tall fra Nav.',
            },
            createdTime: '2023-03-01T00:00:00Z',
            publish: { from: '2023-03-02T00:00:00Z', first: '2023-03-03T00:00:00Z' },
        },
    },
} satisfies Meta<typeof PressNewsItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const News = {
    args: {
        newsItem: {
            ...meta.args.newsItem,
            data: {
                ...meta.args.newsItem.data,
                contentType: 'news',
            },
        },
    },
};

export const English = { args: { newsItem: { ...meta.args.newsItem, language: 'en' } } };

export const EnglishNews = {
    args: {
        newsItem: {
            ...News.args.newsItem,
            language: 'en',
            data: {
                ...meta.args.newsItem.data,
                contentType: 'news',
            },
        },
    },
};

export const Nynorsk = { args: { newsItem: { ...meta.args.newsItem, language: 'nn' } } };

export const NynorskNews = {
    args: {
        newsItem: {
            ...News.args.newsItem,
            language: 'nn',
            data: {
                ...meta.args.newsItem.data,
                contentType: 'news',
            },
        },
    },
};

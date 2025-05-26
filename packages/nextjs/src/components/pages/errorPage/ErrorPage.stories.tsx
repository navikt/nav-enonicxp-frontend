import type { Meta, StoryObj } from '@storybook/react';
import { ContentType } from 'types/content-props/_content-common';
import { Language } from 'translations';
import { ErrorPage } from './ErrorPage';

const meta = {
    component: ErrorPage,
} satisfies Meta<typeof ErrorPage>;

export default meta;

type Story = StoryObj<typeof meta>;

const commonArgs = {
    _id: '123',
    _path: '/test',
    createdTime: '2021-01-01',
    modifiedTime: '2021-01-01',
    displayName: 'Test',
    language: 'no' as Language,
    type: ContentType.Error as const,
};

export const Error400: Story = {
    args: {
        ...commonArgs,
        data: {
            errorMessage: 'Feilmelding',
            errorCode: 400,
        },
    },
};

export const Error404: Story = {
    args: {
        ...commonArgs,
        data: {
            errorMessage: 'Feilmelding',
            errorCode: 404,
        },
    },
};

export const Error408: Story = {
    args: {
        ...commonArgs,
        data: {
            errorMessage: 'Feilmelding',
            errorCode: 408,
        },
    },
};

export const RandomErrorCode: Story = {
    args: {
        ...commonArgs,
        data: {
            errorMessage: 'Feilmelding',
            errorCode: 123,
        },
    },
};

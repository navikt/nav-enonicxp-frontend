import type { Meta, StoryObj } from '@storybook/react';

import { classNames } from 'utils/classnames';
import defaultHtml from 'components/_common/parsedHtml/DefaultHtmlStyling.module.scss';
import { ParsedHtml } from './ParsedHtml';

const meta = {
    component: ParsedHtml,
} satisfies Meta<typeof ParsedHtml>;

export default meta;

type Story = StoryObj<typeof meta>;

const withDefaultHtmlStyling = (Story: any) => (
    <div className={classNames(defaultHtml.html, 'parsedHtml')}>
        <Story />
    </div>
);

const p =
    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua:&nbsp;</p>';

const ul =
    '<ul><li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.&nbsp;</li><li>Aduis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.&nbsp;</li></ul>';

const ol =
    '<ol><li>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.&nbsp;</li><li>Aduis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.&nbsp;</li></ol>';

const a = '<a href="/"><u>lenke</u></a>';

const h1 = '<h2>Lorem ipsum</h2>';
const h2 = '<h2>Lorem ipsum</h2>';
const h3 = '<h3>Lorem ipsum</h3>';
const h4 = '<h4>Lorem ipsum</h4>';
const h5 = '<h5>Lorem ipsum</h5>';
const h6 = '<h6>Lorem ipsum</h6>';

const RandomizedHtml = p + ul + ol + p + h4 + a + ul + h4 + ol + p + a;
const HeadersHtml = h1 + h2 + h3 + h4 + h5 + h6;

export const Default: Story = {
    args: {
        htmlProps: {
            processedHtml: RandomizedHtml,
            macros: [],
        },
    },
};

export const WithStyling: Story = {
    decorators: [withDefaultHtmlStyling],
    args: {
        htmlProps: {
            processedHtml: RandomizedHtml,
            macros: [],
        },
    },
};

export const Headers: Story = {
    args: {
        htmlProps: {
            processedHtml: HeadersHtml,
            macros: [],
        },
    },
};

export const HeadersWithStyling: Story = {
    decorators: [withDefaultHtmlStyling],
    args: {
        htmlProps: {
            processedHtml: HeadersHtml,
            macros: [],
        },
    },
};

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

const h4 = '<h4>Lorem ipsum</h4>';

const a = '<a href="/"><u>lenke</u></a>';

const RandomizedHtml = p + ul + ol + p + h4 + a + ul + h4 + ol + p + a;

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

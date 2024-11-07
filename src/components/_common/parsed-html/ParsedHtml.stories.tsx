import type { Meta, StoryObj } from '@storybook/react';

import { classNames } from 'utils/classnames';
import defaultHtml from 'components/_common/parsed-html/DefaultHtmlStyling.module.scss';
import { ParsedHtml } from './ParsedHtml';

const withWrapperClassnames = (Story: any) => (
    <div className={classNames(defaultHtml.html, 'parsedHtml')}>
        <Story />
    </div>
);

const meta = {
    component: ParsedHtml,
    decorators: [withWrapperClassnames],
} satisfies Meta<typeof ParsedHtml>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        htmlProps: {
            processedHtml:
                // '<p>Som hovedregel kan du ha rett til AAP hvis alt …ilfeller kan du få fra tidligere dato.&nbsp;</p>',
                '<ul>  <li>Belgia</li>  <li>Bulgaria</li>  <li>Danm… trygd kapittel 1 nr. 3 (Lovdata)</a>.&nbsp;</p>',
            macros: [],
        },
    },
};

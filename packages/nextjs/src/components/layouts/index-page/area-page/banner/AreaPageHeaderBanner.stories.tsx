import type { Meta, StoryObj } from '@storybook/react';

import { AreaPageHeaderBanner } from './AreaPageHeaderBanner';

const meta = {
    component: AreaPageHeaderBanner,
} satisfies Meta<typeof AreaPageHeaderBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        banner: {
            link: {
                _selected: 'external',
                internal: { target: { _path: '', displayName: '' } },
                external: { url: '', text: '' },
            },
            html: {
                processedHtml:
                    '<p class="aksel-body-long aksel-body-long--medium aksel-typo--spacing">Logg inn og beregn, søk om eller endre pensjonen din</p>',
                macros: [],
            },
            color: '#FFB8B8',
        },
        header: 'analyticsText',
    },
};

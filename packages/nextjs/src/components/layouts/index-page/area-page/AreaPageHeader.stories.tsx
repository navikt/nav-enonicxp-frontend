import type { Meta, StoryObj } from '@storybook/react';
import { Area } from 'types/areas';
import { AreaPageHeader } from './AreaPageHeader';

const meta = {
    component: AreaPageHeader,
} satisfies Meta<typeof AreaPageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        content: {
            data: {
                header: 'Pensjon',
                area: Area.PENSION,
                banner: {
                    link: {
                        _selected: 'external',
                        internal: { target: { _path: '', displayName: '' } },
                        external: { url: '', text: '' },
                    },
                    html: {
                        processedHtml:
                            '<p class="navds-body-long navds-body-long--medium navds-typo--spacing">Logg inn og beregn, søk om eller endre pensjonen din</p>',
                        macros: [],
                    },
                    color: '#FFB8B8',
                },
            },
        },
    },
};

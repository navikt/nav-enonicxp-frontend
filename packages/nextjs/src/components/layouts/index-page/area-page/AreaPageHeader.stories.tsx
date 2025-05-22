import type { Meta, StoryObj } from '@storybook/react';
import { Area } from 'types/areas';
import { AreaPageHeader } from './AreaPageHeader';
import { Default as BannerDefault } from './banner/AreaPageHeaderBanner.stories';

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
                banner: BannerDefault.args.banner,
            },
        },
    },
};

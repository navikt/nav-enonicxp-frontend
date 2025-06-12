import type { Meta, StoryObj } from '@storybook/react';

import { Area } from 'types/areas';
import { OverviewFilterBase } from './OverviewFilterBase';

const meta = {
    component: OverviewFilterBase,
} satisfies Meta<typeof OverviewFilterBase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        type: 'areas',
        selected: Area.PENSION,
        options: [Area.PENSION, Area.ACCESSIBILITY, Area.DOWNSIZING],
        selectionCallback: () => {},
    },
};

import type { Meta, StoryObj } from '@storybook/react';

import { Area } from 'types/areas';
import { OversiktFilterBase } from './OversiktFilterBase';

const meta = {
    component: OversiktFilterBase,
} satisfies Meta<typeof OversiktFilterBase>;

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

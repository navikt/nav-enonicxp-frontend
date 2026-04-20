import type { Meta, StoryObj } from '@storybook/react';
import { Knapp } from './Knapp';

const meta = {
    component: Knapp,
    args: { children: 'Trykk her' },
} satisfies Meta<typeof Knapp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullWidth: Story = {
    args: {
        fullWidth: true,
    },
};

//ser på dette senere, når vi finner ut hvordan vi skal håndtere ikoner
// export const Icon: Story = {
//     args: {
//         xpIcon: <HandFingerIcon title="a11y-title" />,
//     },
// };

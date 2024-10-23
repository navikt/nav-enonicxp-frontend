import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
    component: Button,
    args: { children: 'Trykk her' },
} satisfies Meta<typeof Button>;

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

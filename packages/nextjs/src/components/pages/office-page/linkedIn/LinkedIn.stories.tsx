import type { Meta, StoryObj } from '@storybook/nextjs';

import { LinkedIn } from './LinkedIn';

const meta = {
    component: LinkedIn,
} satisfies Meta<typeof LinkedIn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { text: 'En fin liten tekst om hvorfor følge med på LinkedIn.' },
};

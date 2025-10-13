import type { Meta, StoryObj } from '@storybook/nextjs';

import { HeaderWithParent } from './HeaderWithParent';

const meta = {
    component: HeaderWithParent,
} satisfies Meta<typeof HeaderWithParent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        contentProps: { data: { title: 'Tittel' } },
        textAboveTitle: 'Tekst over tittel',
    },
};

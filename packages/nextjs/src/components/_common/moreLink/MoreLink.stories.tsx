import type { Meta, StoryObj } from '@storybook/react';
import { MoreLink } from './MoreLink';

const meta = {
    component: MoreLink,
} satisfies Meta<typeof MoreLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        link: {
            _selected: 'external',
            internal: { target: { _path: '', displayName: '' } },
            external: { url: '', text: 'Lenketekst' },
        },
    },
};

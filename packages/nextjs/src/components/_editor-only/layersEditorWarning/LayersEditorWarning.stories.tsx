import type { Meta, StoryObj } from '@storybook/react';
import { LayersEditorWarning } from './LayersEditorWarning';

const meta = {
    component: LayersEditorWarning,
} satisfies Meta<typeof LayersEditorWarning>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

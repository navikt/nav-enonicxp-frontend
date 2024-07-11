import type { Meta, StoryObj } from '@storybook/react';
import { UxSignalsWidget } from './UxSignalsWidget';

const meta = {
    title: 'Components/Common/UxSignalsWidget',
    component: UxSignalsWidget,
} satisfies Meta<typeof UxSignalsWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        embedCode: 'panel-xopvvxqfwp',
    },
};

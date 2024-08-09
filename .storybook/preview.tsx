import type { Preview } from '@storybook/react';
import '../src/global.scss';

const preview: Preview = {
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default preview;

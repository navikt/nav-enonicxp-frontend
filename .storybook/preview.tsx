import type { Preview } from '@storybook/react';
import { allModes } from '../.storybook/modes';
import '../src/global.scss';

const preview: Preview = {
    parameters: {
        viewport: {
            viewports: {
                small: { name: 'Small', styles: { width: '640px', height: '800px' } },
                large: { name: 'Large', styles: { width: '1024px', height: '1000px' } },
            },
        },
        chromatic: {
            modes: {
                mobile: allModes['mobile'],
                desktop: allModes['desktop'],
            },
        },
    },
    tags: ['autodocs'],
};

export default preview;

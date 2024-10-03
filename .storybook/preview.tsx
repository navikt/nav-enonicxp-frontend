import type { Preview } from '@storybook/react';
import { allModes } from '../.storybook/modes';
import '../src/global.scss';

const preview: Preview = {
    parameters: {
        viewport: {
            viewports: {
                small: { name: 'small', styles: { width: '390px', height: '100%' } },
                large: { name: 'large', styles: { width: '820px', height: '100%' } },
            },
        },
        chromatic: {
            modes: {
                small: allModes['small'],
                large: allModes['large'],
            },
        },
    },
    tags: ['autodocs'],
};

export default preview;

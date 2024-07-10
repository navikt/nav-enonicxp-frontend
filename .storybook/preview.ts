import type { Preview } from '@storybook/react';

import '../src/global.scss';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },

    tags: ['autodocs']
};

export default preview;

import type { Preview } from '@storybook/react';
import '../src/global.scss';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        }, //TODO: det over hører til Example, fjerne hvis ikke brukt
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default preview;

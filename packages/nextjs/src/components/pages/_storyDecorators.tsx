import { Provider } from 'react-redux';
import type { Decorator } from '@storybook/react';
import { mockStore } from 'store/store';
import { PageContextProvider } from 'store/pageContext';

export const withStore: Decorator = (Story, context) => (
    <Provider store={mockStore}>
        <PageContextProvider content={context.args}>
            <Story />
        </PageContextProvider>
    </Provider>
);

import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authStateReducer, { AuthState } from 'store/slices/authState';
import { AuthDependantRender } from './AuthDependantRender';

const createMockStore = (authState: AuthState) =>
    configureStore({
        reducer: {
            authState: authStateReducer,
        },
        preloadedState: {
            authState,
        },
    });

const withMockedAuthState = (authState: AuthState) => {
    const Decorator = (Story: any) => (
        <Provider store={createMockStore(authState)}>
            <Story />
        </Provider>
    );
    Decorator.displayName = `withMockedAuthState(${authState.authState})`;
    return Decorator;
};

const meta = { args: { children: 'Visible' }, component: AuthDependantRender } satisfies Meta<
    typeof AuthDependantRender
>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RenderLoggedInStateLoggedIn: Story = {
    args: {
        renderOn: 'loggedIn',
    },
    decorators: [withMockedAuthState({ authState: 'loggedIn' })],
};

export const RenderLoggedInStateLoggedOut: Story = {
    args: {
        renderOn: 'loggedIn',
    },
    decorators: [withMockedAuthState({ authState: 'loggedOut' })],
};

export const RenderLoggedInStateWaiting: Story = {
    args: {
        renderOn: 'loggedIn',
    },
    decorators: [withMockedAuthState({ authState: 'waiting' })],
};

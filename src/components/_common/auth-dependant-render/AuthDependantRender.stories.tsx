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

//renderOn: loggedIn
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

//renderOn: loggedOut
export const RenderLoggedOutStateLoggedIn: Story = {
    args: {
        renderOn: 'loggedOut',
    },
    decorators: [withMockedAuthState({ authState: 'loggedIn' })],
};

export const RenderLoggedOutStateLoggedOut: Story = {
    args: {
        renderOn: 'loggedOut',
    },
    decorators: [withMockedAuthState({ authState: 'loggedOut' })],
};

export const RenderLoggedOutStateWaiting: Story = {
    args: {
        renderOn: 'loggedOut',
    },
    decorators: [withMockedAuthState({ authState: 'waiting' })],
};

//renderOn: waiting
export const RenderWaitingStateLoggedIn: Story = {
    args: {
        renderOn: 'waiting',
    },
    decorators: [withMockedAuthState({ authState: 'loggedIn' })],
};

export const RenderWaitingStateLoggedOut: Story = {
    args: {
        renderOn: 'waiting',
    },
    decorators: [withMockedAuthState({ authState: 'loggedOut' })],
};

export const RenderWaitingStateWaiting: Story = {
    args: {
        renderOn: 'waiting',
    },
    decorators: [withMockedAuthState({ authState: 'waiting' })],
};

//renderOn: always
export const RenderAlwaysStateLoggedIn: Story = {
    args: {
        renderOn: 'always',
    },
    decorators: [withMockedAuthState({ authState: 'loggedIn' })],
};

export const RenderAlwaysStateLoggedOut: Story = {
    args: {
        renderOn: 'always',
    },
    decorators: [withMockedAuthState({ authState: 'loggedOut' })],
};

export const RenderAlwaysStateWaiting: Story = {
    args: {
        renderOn: 'always',
    },
    decorators: [withMockedAuthState({ authState: 'waiting' })],
};

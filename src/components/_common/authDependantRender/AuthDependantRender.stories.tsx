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
export const RenderOnLoggedInStateLoggedIn: Story = {
    args: {
        renderOn: 'loggedIn',
    },
    decorators: [withMockedAuthState({ authState: 'loggedIn' })],
};

export const RenderOnLoggedInStateLoggedOut: Story = {
    args: {
        renderOn: 'loggedIn',
    },
    decorators: [withMockedAuthState({ authState: 'loggedOut' })],
};

export const RenderOnLoggedInStateWaiting: Story = {
    args: {
        renderOn: 'loggedIn',
    },
    decorators: [withMockedAuthState({ authState: 'waiting' })],
};

//renderOn: loggedOut
export const RenderOnLoggedOutStateLoggedIn: Story = {
    args: {
        renderOn: 'loggedOut',
    },
    decorators: [withMockedAuthState({ authState: 'loggedIn' })],
};

export const RenderOnLoggedOutStateLoggedOut: Story = {
    args: {
        renderOn: 'loggedOut',
    },
    decorators: [withMockedAuthState({ authState: 'loggedOut' })],
};

export const RenderOnLoggedOutStateWaiting: Story = {
    args: {
        renderOn: 'loggedOut',
    },
    decorators: [withMockedAuthState({ authState: 'waiting' })],
};

//renderOn: waiting
export const RenderOnWaitingStateLoggedIn: Story = {
    args: {
        renderOn: 'waiting',
    },
    decorators: [withMockedAuthState({ authState: 'loggedIn' })],
};

export const RenderOnWaitingStateLoggedOut: Story = {
    args: {
        renderOn: 'waiting',
    },
    decorators: [withMockedAuthState({ authState: 'loggedOut' })],
};

export const RenderOnWaitingStateWaiting: Story = {
    args: {
        renderOn: 'waiting',
    },
    decorators: [withMockedAuthState({ authState: 'waiting' })],
};

//renderOn: always
export const RenderOnAlwaysStateLoggedIn: Story = {
    args: {
        renderOn: 'always',
    },
    decorators: [withMockedAuthState({ authState: 'loggedIn' })],
};

export const RenderOnAlwaysStateLoggedOut: Story = {
    args: {
        renderOn: 'always',
    },
    decorators: [withMockedAuthState({ authState: 'loggedOut' })],
};

export const RenderOnAlwaysStateWaiting: Story = {
    args: {
        renderOn: 'always',
    },
    decorators: [withMockedAuthState({ authState: 'waiting' })],
};

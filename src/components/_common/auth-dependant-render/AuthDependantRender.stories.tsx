// AuthDependantRender.stories.tsx
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import authStateReducer, { AuthState } from 'store/slices/authState';
import { AuthDependantRender } from './AuthDependantRender';

// Create a mock Redux store
const createMockStore = (authState: AuthState) =>
    configureStore({
        reducer: {
            authState: authStateReducer,
        },
        preloadedState: {
            authState, // Preload the store with a specific auth state
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

const meta = {
    component: AuthDependantRender,
} satisfies Meta<typeof AuthDependantRender>;

export default meta;
type Story = StoryObj<typeof meta>;

// Example story when the user is logged in
export const LoggedInStory: Story = {
    args: {
        renderOn: 'loggedIn',
        children: 'This content is visible when logged in',
    },
    decorators: [withMockedAuthState({ authState: 'loggedIn' })], // Mock the authState as 'loggedIn'
};

// Example story when the user is logged out
export const LoggedOutStory: Story = {
    args: {
        renderOn: 'loggedOut',
        children: 'This content is visible when logged out',
    },
    decorators: [withMockedAuthState({ authState: 'loggedOut' })], // Mock the authState as 'loggedOut'
};

// Example story when authState is waiting
export const WaitingAuthStory: Story = {
    args: {
        renderOn: 'loggedIn',
        children: 'Waiting for authentication...',
    },
    decorators: [withMockedAuthState({ authState: 'waiting' })], // Mock the authState as 'waiting'
};

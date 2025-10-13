import React, { createContext, useContext } from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';
import { DEFAULT_FLAGS, UnleashFlags } from 'utils/unleash-server';

type PageContextValue = {
    content: ContentProps;
    flags: UnleashFlags;
};

const PageContext = createContext<PageContextValue>({
    content: {
        type: ContentType.FallbackPage,
        _id: '',
        _path: '',
        createdTime: '',
        modifiedTime: '',
        displayName: 'Laster innhold...',
        language: 'no',
        data: {},
    },
    flags: DEFAULT_FLAGS,
});

type PageContextProviderProps = {
    children: React.ReactNode;
    content: ContentProps;
    flags?: UnleashFlags;
};

const PageContextProvider: React.FC<PageContextProviderProps> = ({ children, content, flags }) => {
    return <PageContext.Provider value={{ content, flags: flags ?? DEFAULT_FLAGS }}>{children}</PageContext.Provider>;
};

const usePageContentProps = <T = ContentProps,>() => {
    const context = useContext(PageContext);

    if (!context) {
        throw new Error('usePageContentProps must be used within a PageContextProvider');
    }

    return context.content as T;
};

const useFeatureFlags = (): UnleashFlags => {
    const context = useContext(PageContext);

    if (!context) {
        throw new Error('useFeatureFlags must be used within a PageContextProvider');
    }

    return context.flags;
};

export { PageContextProvider, usePageContentProps, useFeatureFlags };

import React, { createContext, useContext } from 'react';
import { ContentProps, ContentType } from 'types/content-props/_content-common';

const PageContext = createContext<ContentProps>({
    type: ContentType.FallbackPage,
    _id: '',
    _path: '',
    createdTime: '',
    modifiedTime: '',
    displayName: 'Laster innhold...',
    language: 'no',
    data: {},
});

const PageContextProvider: React.FC<any> = ({ children, content }) => {
    return <PageContext.Provider value={content}>{children}</PageContext.Provider>;
};

const usePageContentProps = <T = ContentProps,>() => {
    const context = useContext(PageContext);

    if (!context) {
        throw new Error('usePageContentProps must be used within a PageContextProvider');
    }

    return context as T;
};

export { PageContextProvider, usePageContentProps };

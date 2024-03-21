import React, { createContext, useContext } from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { makeErrorProps } from 'utils/make-error-props';

const PageContext = createContext<ContentProps>(null);

const PageContextProvider: React.FC<any> = ({ children, content }) => {
    return (
        <PageContext.Provider value={content}>{children}</PageContext.Provider>
    );
};

const usePageContentProps = () => {
    const context = useContext(PageContext);

    if (!context) {
        throw new Error(
            'usePageContentProps must be used within a PageContextProvider'
        );
    }

    return context;
};

export { PageContextProvider, usePageContentProps };

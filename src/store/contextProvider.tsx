import React, { createContext, useContext } from 'react';
import { ContentProps } from 'types/content-props/_content-common';

const PageContext = createContext<ContentProps>(null);

const PageContextProvider: React.FC<any> = ({ children, content }) => {
    return (
        <PageContext.Provider value={content}>{children}</PageContext.Provider>
    );
};

const usePageContext = () => {
    const context = useContext(PageContext);

    if (!context) {
        throw new Error('usePageContext must be used within a MyProvider');
    }

    return context;
};

export { PageContextProvider, usePageContext };

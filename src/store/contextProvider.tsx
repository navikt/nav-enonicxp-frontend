import React, { createContext, useContext } from 'react';
import { ContentProps } from 'types/content-props/_content-common';

const PageContext = createContext<ContentProps>(null);

const PageContextProvider: React.FC<any> = ({ children }) => {
    return <PageContext.Provider value={null}>{children}</PageContext.Provider>;
};

// Step 3: Create the consumer hook
const useMyContext = () => {
    const context = useContext(PageContextProvider);

    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }

    return context;
};

export { PageContextProvider, useMyContext };

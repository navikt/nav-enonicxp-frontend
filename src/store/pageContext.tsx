import React, { createContext, useContext } from 'react';
import { ContentProps } from 'types/content-props/_content-common';
import { logger } from 'srcCommon/logger';

const PageContext = createContext<ContentProps | {}>({});

const PageContextProvider: React.FC<any> = ({ children, content }) => {
    return (
        <PageContext.Provider value={content || {}}>
            {children}
        </PageContext.Provider>
    );
};

const usePageContentProps = (): ContentProps => {
    const context = useContext(PageContext) as ContentProps;

    if (!context) {
        logger.error('Could not get page context from useContext');
    }

    return context;
};

export { PageContextProvider, usePageContentProps };

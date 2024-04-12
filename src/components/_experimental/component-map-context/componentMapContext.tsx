import React, { createContext, useContext } from 'react';
import { PartComponent, PartType } from 'components/types/component-props/parts';
import { EmptyObject } from '@reduxjs/toolkit';

type PartsMap = { [Key in PartType]?: PartComponent<Key> };

export type ComponentsMapping = {
    pages: EmptyObject;
    layouts: EmptyObject;
    parts: PartsMap;
    macros: EmptyObject;
};

const ComponentsMappingContext = createContext<ComponentsMapping>({
    pages: {},
    layouts: {},
    parts: {},
    macros: {},
});

type ProviderProps = {
    children: React.ReactNode;
    componentsMapping: ComponentsMapping;
};

export const ComponentsMappingProvider = ({ children, componentsMapping }: ProviderProps) => {
    return (
        <ComponentsMappingContext.Provider value={componentsMapping}>
            {children}
        </ComponentsMappingContext.Provider>
    );
};

export const useComponentsMapping = () => {
    const { pages, layouts, parts, macros } = useContext(ComponentsMappingContext);

    return { pages, layouts, parts, macros };
};

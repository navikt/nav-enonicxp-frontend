import React, { createContext, useContext } from 'react';
import { PartComponent, PartType, PartTypeAll } from 'types/component-props/parts';
import { EmptyObject } from 'types/util-types';
import { ComponentProps } from 'types/component-props/_component-common';

type PartsMap = {
    [Key in PartTypeAll]?: Key extends PartType ? PartComponent<Key> : undefined;
};

type UnimplementedMap = Record<string, any>;

export type XpComponentsConfig = {
    pages?: UnimplementedMap;
    layouts?: UnimplementedMap;
    parts?: UnimplementedMap;
    macros?: UnimplementedMap;
    useGlobalFallback?: boolean;
};

const ComponentsContext = createContext<XpComponentsConfig>({
    pages: {},
    layouts: {},
    parts: {},
    macros: {},
    useGlobalFallback: false,
});

type ProviderProps = {
    children: React.ReactNode;
    config: XpComponentsConfig;
};

export const XpComponentsConfigProvider = ({ children, config }: ProviderProps) => {
    return <ComponentsContext.Provider value={config}>{children}</ComponentsContext.Provider>;
};

export const useXpComponentsConfig = (): Required<XpComponentsConfig> => {
    const {
        pages = {},
        layouts = {},
        parts = {},
        macros = {},
        useGlobalFallback = false,
    } = useContext(ComponentsContext);

    return { pages, layouts, parts, macros, useGlobalFallback };
};

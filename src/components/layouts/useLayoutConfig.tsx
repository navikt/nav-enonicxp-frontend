import React, { useContext } from 'react';
import { LayoutType } from 'types/component-props/layouts';
import { EmptyObject } from 'types/util-types';
import { ComponentEditorProps } from 'components/ComponentMapper';

type LayoutConfig = {
    type: LayoutType;
    title?: string;
    editorProps?: ComponentEditorProps;
};

const LayoutContext = React.createContext<LayoutConfig | EmptyObject>({});

export const useLayoutConfig = () => {
    const layoutConfig = useContext(LayoutContext);
    return { layoutConfig, LayoutConfigProvider: LayoutContext.Provider };
};

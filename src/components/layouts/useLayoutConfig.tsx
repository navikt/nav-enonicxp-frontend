import React, { useContext } from 'react';

import { LayoutType } from 'types/component-props/layouts';
import { EmptyObject } from 'types/util-types';

type LayoutConfig = {
    type: LayoutType;
    title?: string;
};

const LayoutContext = React.createContext<LayoutConfig | EmptyObject>({});

export const useLayoutConfig = () => {
    const layoutConfig = useContext(LayoutContext);
    return { layoutConfig, LayoutConfigProvider: LayoutContext.Provider };
};

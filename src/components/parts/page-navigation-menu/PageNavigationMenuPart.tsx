import React from 'react';

import { PageNavigationMenuProps } from 'types/component-props/parts/page-navigation-menu';
import { PageNavigationMenu } from 'components/_common/page-navigation-menu/PageNavigationMenu';

export const PageNavigationMenuPart = ({ config }: PageNavigationMenuProps) => {
    if (!config) {
        return null;
    }

    return (
        <PageNavigationMenu
            anchorLinks={config.anchorLinks}
            title={config.title}
            viewStyle={config.viewStyle || 'inContent'}
        />
    );
};

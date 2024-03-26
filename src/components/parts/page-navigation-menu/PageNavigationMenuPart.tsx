import React from 'react';
import { PageNavigationMenu } from 'components/_common/page-navigation-menu/PageNavigationMenu';
import { PartComponent, PartType } from 'types/component-props/parts';

export const PageNavigationMenuPart: PartComponent<
    PartType.PageNavigationMenu
> = ({ config }) => {
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

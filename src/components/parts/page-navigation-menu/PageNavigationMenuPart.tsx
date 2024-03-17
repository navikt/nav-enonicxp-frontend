import React from 'react';
import { PageNavigationMenu } from '../../_common/page-navigation-menu/PageNavigationMenu';
import {
    PartComponentProps,
    PartType,
} from '../../../types/component-props/parts';

export const PageNavigationMenuPart = ({
    config,
}: PartComponentProps<PartType.PageNavigationMenu>) => {
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

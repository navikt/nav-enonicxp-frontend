import React from 'react';
import { PageNavigationMenu } from 'components/_common/page-navigation-menu/PageNavigationMenu';
import { PartComponentProps, PartType } from 'types/component-props/parts';

export type AnchorLink = {
    anchorId: string;
    linkText: string;
    isDupe?: boolean;
};

export type PageNavViewStyle = 'sidebar' | 'inContent';

export type PartConfigPageNavigationMenu = {
    title: string;
    anchorLinks: AnchorLink[];
    viewStyle: PageNavViewStyle;
};

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

import React from 'react';
import { PageNavigationMenu } from 'components/_common/page-navigation-menu/PageNavigationMenu';
import { PartComponentProps, PartType } from 'types/component-props/parts';

export type AnchorLink = {
    anchorId: string;
    linkText: string;
    isDupe?: boolean;
    isPartRelatedSituations?: boolean;
};

export type PartConfigPageNavigationMenu = {
    title: string;
    anchorLinks: AnchorLink[];
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
            isChapterNavigation
        />
    );
};

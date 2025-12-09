import React from 'react';
import { PageNavigationMenu } from 'components/_common/pageNavigationMenu/PageNavigationMenu';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';
import { translator } from 'translations';

export type AnchorLink = {
    anchorId: string;
    linkText: string;
    isDupe?: boolean;
    isPartRelatedSituations?: boolean;
};

export type PartConfigPageNavigationMenu = {
    anchorLinks: AnchorLink[];
};

export const PageNavigationMenuPart = ({
    config,
}: PartComponentProps<PartType.PageNavigationMenu>) => {
    const { language } = usePageContentProps();
    const getLabel = translator('internalNavigation', language);

    if (!config) {
        return null;
    }

    return (
        <PageNavigationMenu
            anchorLinks={config.anchorLinks}
            ariaLabel={getLabel('pageNavigationMenu')}
            isChapterNavigation
        />
    );
};

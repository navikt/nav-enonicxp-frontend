import React from 'react';
import { PartComponentProps, PartType } from 'types/component-props/parts';
import { usePageContentProps } from 'store/pageContext';
import { CombinedMenu } from 'components/_common/pageNavigationMenu/CombinedMenu/CombinedMenu';

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
    const pageProps = usePageContentProps();

    if (!config) {
        return null;
    }

    return <CombinedMenu anchorLinks={config.anchorLinks} pageProps={pageProps} />;
};

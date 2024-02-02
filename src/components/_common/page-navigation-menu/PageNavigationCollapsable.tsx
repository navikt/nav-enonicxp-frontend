import { useState } from 'react';
import { Button } from '@navikt/ds-react';
import {
    AnchorLink,
    PageNavViewStyle,
} from 'types/component-props/parts/page-navigation-menu';
import { PageNavigationLink } from './PageNavigationLink';
import {
    PageNavScrollDirection,
    getPageNavigationLinkId,
} from './PageNavigationMenu';

import { classNames } from 'utils/classnames';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';

import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';

import sidebarStyle from './views/PageNavigationSidebar.module.scss';
import inContentStyle from './views/PageNavigationInContent.module.scss';

import styles from './PageNavigationCollapsable.module.scss';

type CollapsableItemProps = {
    anchorLink: AnchorLink;
    currentIndex: number;
    viewStyle: PageNavViewStyle;
    isCurrent: boolean;
    scrollDirection: PageNavScrollDirection;
};

export const CollapsableItem = ({
    anchorLink,
    currentIndex,
    scrollDirection,
    isCurrent,
    viewStyle,
}: CollapsableItemProps) => {
    const [isOpen, setOpen] = useState(false);
    const { language } = usePageConfig();

    const menuStrings = translator('productPageMenu', language);

    const chevron = isOpen ? (
        <ChevronUpIcon aria-hidden />
    ) : (
        <ChevronDownIcon aria-hidden />
    );

    const ariaToggleLabelPrefix = isOpen ? 'clickToCollapse' : 'clickToExpand';

    const currentViewStyle =
        viewStyle === 'sidebar' ? sidebarStyle : inContentStyle;

    return (
        <>
            <div
                className={classNames(
                    styles.pageNavCollapsable,
                    currentViewStyle.pageNavLink,
                    scrollDirection && sidebarStyle[scrollDirection],
                    isCurrent && sidebarStyle.current
                )}
                onClick={() => setOpen(!isOpen)}
            >
                {viewStyle === 'sidebar' && (
                    <span
                        className={currentViewStyle.decor}
                        aria-hidden={true}
                    />
                )}
                <Button
                    onClick={() => setOpen(!isOpen)}
                    variant="tertiary"
                    className={classNames(
                        styles.toggleCollapse,
                        isCurrent && currentViewStyle.current,
                        isOpen && styles.open
                    )}
                    iconPosition="right"
                    icon={chevron}
                    aria-label={`${menuStrings(ariaToggleLabelPrefix)} ${
                        anchorLink.linkText
                    }`}
                >
                    {anchorLink.linkText}
                </Button>
            </div>
            <ul className={classNames(styles.list, isOpen && styles.open)}>
                {anchorLink.subLinks.map((subLink, index) => (
                    <li key={subLink.anchorId}>
                        <PageNavigationLink
                            targetId={subLink.anchorId}
                            linkId={getPageNavigationLinkId(subLink.anchorId)}
                            scrollDirection={scrollDirection}
                            viewStyle={viewStyle}
                            isSubLink={true}
                        >
                            {subLink.linkText}
                        </PageNavigationLink>
                    </li>
                ))}
            </ul>
        </>
    );
};

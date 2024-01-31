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

import styles from './PageNavigationCollapsable.module.scss';
import { usePageConfig } from 'store/hooks/usePageConfig';
import { translator } from 'translations';

type CollapsableItemProps = {
    anchorLink: AnchorLink;
    currentIndex: number;
    viewStyle: PageNavViewStyle;
    scrollDirection: PageNavScrollDirection;
};

export const CollapsableItem = ({
    anchorLink,
    currentIndex,
    scrollDirection,
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

    return (
        <>
            <Button
                onClick={() => setOpen(!isOpen)}
                variant="tertiary"
                className={classNames(
                    styles.toggleCollapse,
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
            <ul className={classNames(styles.list, isOpen && styles.open)}>
                {anchorLink.subLinks.map((subLink, index) => (
                    <li key={subLink.anchorId}>
                        <PageNavigationLink
                            targetId={subLink.anchorId}
                            linkId={getPageNavigationLinkId(subLink.anchorId)}
                            isCurrent={currentIndex === index}
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

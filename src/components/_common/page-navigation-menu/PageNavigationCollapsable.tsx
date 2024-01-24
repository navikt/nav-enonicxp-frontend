import { useState } from 'react';
import {
    AnchorLink,
    PageNavViewStyle,
} from 'types/component-props/parts/page-navigation-menu';
import { PageNavigationLink } from './PageNavigationLink';
import {
    PageNavScrollDirection,
    getPageNavigationLinkId,
} from './PageNavigationMenu';

import styles from './PageNavigationCollapsable.module.scss';
import { classNames } from 'utils/classnames';
import { Button } from '@navikt/ds-react';

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

    // Todo: Kun bruke ul/li hvis mer enn én sublink

    return (
        <li>
            <Button
                onClick={() => setOpen(!isOpen)}
                variant="tertiary"
                className={classNames(
                    styles.collapsableItem,
                    isOpen && styles.open
                )}
            >
                {anchorLink.linkText}
            </Button>
            <ul>
                {anchorLink.subLinks.map((subLink, index) => (
                    <li key={subLink.anchorId}>
                        <PageNavigationLink
                            targetId={anchorLink.anchorId}
                            linkId={getPageNavigationLinkId(
                                anchorLink.anchorId
                            )}
                            isCurrent={currentIndex === index}
                            scrollDirection={scrollDirection}
                            viewStyle={viewStyle}
                        >
                            {anchorLink.linkText}
                        </PageNavigationLink>
                    </li>
                ))}
            </ul>
        </li>
    );
};

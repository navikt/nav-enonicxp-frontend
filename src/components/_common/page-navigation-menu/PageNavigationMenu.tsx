import React from 'react';
import { AnchorLink } from '../../../types/component-props/parts/page-navigation-menu';
import { AccordionAnchorMenu, AccordionAnchorMenuItem } from '@navikt/ds-react';
import { classNames, BEM } from '../../../utils/classnames';

import './PageNavigationMenu.less';

type Props = {
    title: string;
    anchorLinks: AnchorLink[];
    placement?: string;
};

export const PageNavigationMenu = ({
    anchorLinks,
    title,
    placement,
}: Props) => {
    const bem = BEM(
        placement === 'content'
            ? 'incontent-navigation-menu'
            : 'sidebar-navigation-menu'
    );

    return (
        <div className={classNames(bem(), bem('wrapper'))}>
            <AccordionAnchorMenu title={title}>
                {anchorLinks?.map((link) => (
                    <AccordionAnchorMenuItem
                        href={`#${link.anchorId}`}
                        key={link.anchorId}
                        className={bem('menu-item')}
                    >
                        {link.linkText}
                    </AccordionAnchorMenuItem>
                ))}
            </AccordionAnchorMenu>
        </div>
    );
};

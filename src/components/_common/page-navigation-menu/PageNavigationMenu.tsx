import React from 'react';
import { AnchorLink } from '../../../types/component-props/parts/page-navigation-menu';
import { AccordionAnchorMenu, AccordionAnchorMenuItem } from '@navikt/ds-react';

type Props = {
    title: string;
    anchorLinks: AnchorLink[];
};

export const PageNavigationMenu = ({ anchorLinks, title }: Props) => {
    return (
        <AccordionAnchorMenu title={title}>
            {anchorLinks?.map((link) => (
                <AccordionAnchorMenuItem href={`#${link.anchorId}`}>
                    {link.linkText}
                </AccordionAnchorMenuItem>
            ))}
        </AccordionAnchorMenu>
    );
};

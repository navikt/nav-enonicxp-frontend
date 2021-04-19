import React from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import Region from '../../Region';
import { RegionProps } from '../../../../types/component-props/layouts';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { AccordionAnchorMenu, AccordionAnchorMenuItem } from '@navikt/ds-react';
import { AnchorLink } from '../../../../types/component-props/pages/page-with-side-menus';
import './LeftMenuSection.less';

const bem = BEM('left-menu');

type Props = {
    internalLinks: AnchorLink[];
    menuHeader: string;
    regionProps: RegionProps;
    pageProps: ContentProps;
};

export const LeftMenuSection = React.memo(
    ({ internalLinks, menuHeader, regionProps, pageProps }: Props) => {
        const links = internalLinks?.length > 0 ? internalLinks : [];
        return (
            <div className={classNames(bem())}>
                <AccordionAnchorMenu title={menuHeader}>
                    {links.map((link) => (
                        <AccordionAnchorMenuItem href={`#${link.anchorId}`}>
                            {link.linkText}
                        </AccordionAnchorMenuItem>
                    ))}
                </AccordionAnchorMenu>
                <Region pageProps={pageProps} regionProps={regionProps} />
            </div>
        );
    }
);

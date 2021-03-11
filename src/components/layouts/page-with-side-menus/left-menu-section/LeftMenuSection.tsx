import React, { useEffect, useRef, useState } from 'react';
import { BEM, classNames } from '../../../../utils/classnames';
import Region from '../../Region';
import { AnchorLink } from '../../../../types/component-props/parts/page-navigation-menu';
import { RegionProps } from '../../../../types/component-props/layouts';
import { ContentProps } from '../../../../types/content-props/_content-common';
import { AccordionMenu } from '@navikt/ds-react';
import './LeftMenuSection.less';

const bem = BEM('left-menu');

type Props = {
    internalLinks: AnchorLink[];
    menuHeader: string;
    stickyToggle: boolean;
    regionProps: RegionProps;
    pageProps: ContentProps;
};

export const LeftMenuSection = React.memo(
    ({ internalLinks, menuHeader, regionProps, pageProps }: Props) => {
        return (
            <>
                <AccordionMenu title={menuHeader}>
                    {internalLinks?.length > 0 &&
                        internalLinks.map((link) => (
                            <AccordionMenu.Item href={`#${link.anchorId}`}>
                                {link.linkText}
                            </AccordionMenu.Item>
                        ))}
                </AccordionMenu>
                <Region pageProps={pageProps} regionProps={regionProps} />
            </>
        );
    }
);

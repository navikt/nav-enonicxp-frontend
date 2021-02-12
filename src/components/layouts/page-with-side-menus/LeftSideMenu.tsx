import React, { useState } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { LenkeBase } from '../../_common/lenke/LenkeBase';
import { ProgressBars } from '../../_common/progress-bars/ProgressBars';
import { NedChevron } from 'nav-frontend-chevron';
import { BEM, classNames } from '../../../utils/classnames';
import {
    PageNavCallbackArgs,
    PageNavigationMenu,
} from '../../parts/_dynamic/page-navigation-menu/PageNavigationMenu';
import Region from '../Region';
import { AnchorLink } from '../../../types/component-props/parts/page-navigation-menu';
import { RegionProps } from '../../../types/component-props/layouts';
import { ContentProps } from '../../../types/content-props/_content-common';
import { useStickyUpdate } from '../../../utils/useStickyUpdate';
import './LeftSideMenu.less';

const bem = BEM('left-menu');

type Props = {
    internalLinks: AnchorLink[];
    menuHeader: string;
    stickyToggle: boolean;
    regionProps: RegionProps;
    pageProps: ContentProps;
};

export const LeftSideMenu = React.memo(
    ({
        internalLinks,
        menuHeader,
        stickyToggle,
        regionProps,
        pageProps,
    }: Props) => {
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
        const [currentItem, setCurrentItem] = useState<PageNavCallbackArgs>();
        useStickyUpdate(stickyToggle);

        const toggleMobileMenu = (e: React.MouseEvent) => {
            e.preventDefault();
            setIsMobileMenuOpen(!isMobileMenuOpen);
        };

        return (
            <div
                className={classNames(
                    bem(),
                    stickyToggle && bem(undefined, 'sticky'),
                    isMobileMenuOpen && bem(undefined, 'open')
                )}
            >
                <LenkeBase
                    className={classNames(bem('header-mobile'))}
                    href={'#'}
                    onClick={toggleMobileMenu}
                    aria-labelledby={'mobile-header-label'}
                >
                    <div className={bem('header-mobile-left')}>
                        {currentItem?.index >= 0 ? (
                            <>
                                <Undertittel>
                                    {currentItem.linkText}
                                </Undertittel>
                                <ProgressBars
                                    currentIndex={currentItem.index}
                                    length={internalLinks.length}
                                    className={bem('progress-bar')}
                                />
                            </>
                        ) : (
                            menuHeader && (
                                <Undertittel>{menuHeader}</Undertittel>
                            )
                        )}
                    </div>
                    <div
                        className={bem('header-mobile-right')}
                        id={'mobile-header-label'}
                    >
                        {isMobileMenuOpen ? 'Lukk meny' : 'Åpne meny'}
                        <NedChevron className={bem('header-mobile-chevron')} />
                    </div>
                </LenkeBase>
                {menuHeader && (
                    <Undertittel className={bem('header-desktop')}>
                        {menuHeader}
                    </Undertittel>
                )}
                <div className={bem('menu-items-outer')}>
                    <div className={bem('menu-items')}>
                        {internalLinks?.length > 0 && (
                            <PageNavigationMenu
                                config={{ anchorLinks: internalLinks }}
                                currentLinkCallback={setCurrentItem}
                            />
                        )}
                        <Region
                            pageProps={pageProps}
                            regionProps={regionProps}
                        />
                    </div>
                </div>
            </div>
        );
    }
);

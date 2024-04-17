import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from 'components/_common/lenke/LenkeBase';
import { smoothScrollToTarget } from 'utils/scroll-to';
import Config from 'config';
import { PageNavViewStyle } from 'components/parts/page-navigation-menu/PageNavigationMenuPart';
import { PageNavScrollDirection } from './PageNavigationMenu';

import style from './PageNavigationLink.module.scss';
import sidebarStyle from './views/PageNavigationSidebar.module.scss';
import inContentStyle from './views/PageNavigationInContent.module.scss';

const ANCHOR_OFFSET_PX = Config.vars.pxPerRem;

type Props = {
    targetId: string;
    viewStyle: PageNavViewStyle;
    linkId?: string;
    isCurrent?: boolean;
    scrollDirection?: PageNavScrollDirection;
    children: React.ReactNode;
};

export const PageNavigationLink = React.memo(
    ({ targetId, linkId, isCurrent, scrollDirection, viewStyle, children }: Props) => {
        const setLocationHashAndScrollToTarget = (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            window.history.pushState(window.history.state, '', `#${targetId}`);
            smoothScrollToTarget(targetId, ANCHOR_OFFSET_PX);
        };

        const currentViewStyle = viewStyle === 'sidebar' ? sidebarStyle : inContentStyle;

        return (
            <LenkeBase
                href={`#${targetId}`}
                onClick={setLocationHashAndScrollToTarget}
                analyticsLinkGroup={'Innhold'}
                analyticsComponent={'Meny for intern-navigasjon'}
                className={classNames(
                    style.pageNavLink,
                    currentViewStyle.pageNavLink,
                    scrollDirection && sidebarStyle[scrollDirection],
                    isCurrent && sidebarStyle.current
                )}
                id={linkId}
            >
                {viewStyle === 'sidebar' && (
                    <span className={currentViewStyle.decor} aria-hidden={true} />
                )}
                <BodyShort className={style.linkText}>{children}</BodyShort>
            </LenkeBase>
        );
    }
);

PageNavigationLink.displayName = 'PageNavigationLink';

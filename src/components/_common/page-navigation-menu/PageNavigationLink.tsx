import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { classNames } from 'utils/classnames';
import { LenkeBase } from '../lenke/LenkeBase';
import { PageNavViewStyle } from 'types/component-props/parts/page-navigation-menu';
import {
    pageNavigationAnchorOffsetPx,
    PageNavScrollDirection,
} from './PageNavigationMenu';
import { smoothScrollToTarget } from 'utils/scroll';

import style from './PageNavigationLink.module.scss';
import sidebarStyle from './views/PageNavigationSidebar.module.scss';
import inContentStyle from './views/PageNavigationInContent.module.scss';

type Props = {
    targetId: string;
    viewStyle: PageNavViewStyle;
    linkId?: string;
    isCurrent?: boolean;
    scrollDirection?: PageNavScrollDirection;
    children: React.ReactNode;
};

export const PageNavigationLink = React.memo(
    ({
        targetId,
        linkId,
        isCurrent,
        scrollDirection,
        viewStyle,
        children,
    }: Props) => {
        const setLocationHashAndScrollToTarget = (e) => {
            e.preventDefault();

            window.history.pushState(
                window.history.state,
                undefined,
                `#${targetId}`
            );

            smoothScrollToTarget(targetId, pageNavigationAnchorOffsetPx);
        };

        const currentViewStyle =
            viewStyle === 'sidebar' ? sidebarStyle : inContentStyle;

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
                    <span
                        className={currentViewStyle.decor}
                        aria-hidden={true}
                    />
                )}
                <BodyShort className={style.linkText}>{children}</BodyShort>
            </LenkeBase>
        );
    }
);

PageNavigationLink.displayName = 'PageNavigationLink';

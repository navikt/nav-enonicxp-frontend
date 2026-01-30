import React from 'react';
import { BodyShort } from '@navikt/ds-react';
import { LenkeBase } from 'components/_common/lenke/lenkeBase/LenkeBase';
import { AnalyticsEvents } from 'utils/analytics';
import { classNames } from 'utils/classnames';
import { AngleIcon } from 'components/_common/pageNavigationMenu/AngleIcon/AngleIcon';

import style from './NavigationLink.module.scss';

type Props = {
    anchorId: string;
    linkText: string;
    analyticsComponent: string;
    className?: string;
    'aria-current'?: 'true';
    'aria-expanded'?: 'true' | 'false';
    'aria-controls'?: string;
    tabIndex?: number;
};

export const NavigationLink = ({
    anchorId,
    linkText,
    analyticsComponent,
    className,
    'aria-current': ariaCurrent,
    'aria-expanded': ariaExpanded,
    'aria-controls': ariaControls,
    tabIndex,
}: Props) => {
    return (
        <LenkeBase
            href={`#${anchorId}`}
            analyticsEvent={AnalyticsEvents.NAVIGATION}
            analyticsLinkGroup={'Innhold'}
            analyticsComponent={analyticsComponent}
            analyticsLabel={linkText}
            className={classNames(style.link, className)}
            aria-current={ariaCurrent}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
            tabIndex={tabIndex}
        >
            <AngleIcon />
            <BodyShort as="span" className={style.linkText}>
                {linkText}
            </BodyShort>
        </LenkeBase>
    );
};

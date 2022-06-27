import { Next, Back } from '@navikt/ds-icons';
import React, { useRef } from 'react';
import { classNames } from 'utils/classnames';

import style from './NavigationButton.module.scss';

type NavigationButtonProps = {
    hidden: boolean;
    direction: number;
    navigateCallback: (direction: number) => void;
};

export const NavigationButton = ({
    direction,
    hidden,
    navigateCallback,
}: NavigationButtonProps) => {
    const isScrolling = useRef(false);

    const onNavigateStart = () => {
        isScrolling.current = true;
        singleNavigation();
    };

    const onNavigateEnd = () => {
        isScrolling.current = false;
    };

    const singleNavigation = () => {
        navigateCallback(direction);

        if (isScrolling.current) {
            setTimeout(singleNavigation, 50);
        }
    };

    // Prevents the "right click" menu popping up.
    const onContextMenu = (e: React.SyntheticEvent) => {
        e.preventDefault();
    };

    const icon = direction === 1 ? <Back /> : <Next />;

    return (
        <button
            className={classNames(
                style.navigationButton,
                hidden && style.hidden,
                direction === 1 ? style.leftSide : style.rightSide
            )}
            type="button"
            disabled={hidden}
            aria-hidden={hidden}
            aria-label={direction === 1 ? 'Rull til venstre' : 'Rull til høyre'}
            onClick={() => navigateCallback(direction)}
            onMouseDown={onNavigateStart}
            onTouchStart={onNavigateStart}
            onMouseLeave={onNavigateEnd}
            onMouseUp={onNavigateEnd}
            onTouchEnd={onNavigateEnd}
            onTouchMove={onNavigateEnd}
            onTouchCancel={onNavigateEnd}
            onContextMenu={onContextMenu}
        >
            {icon}
        </button>
    );
};

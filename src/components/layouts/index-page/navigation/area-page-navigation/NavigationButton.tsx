import { Next, Back } from '@navikt/ds-icons';
import { useRef } from 'react';
import { classNames } from 'utils/classnames';
import style from './NavigationButton.module.scss';

type NavigationButtonProps = {
    hidden: boolean;
    direction: number;
    navigateCallback: (direction: number) => void;
};

let navigateInterval: NodeJS.Timer;

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
            setTimeout(singleNavigation, 500);
        }
    };

    const icon = direction === 1 ? <Back /> : <Next />;

    return (
        <button
            className={classNames(
                style.navigationButton,
                hidden && style.hidden,
                direction === 1 ? style.leftSide : style.rightSide
            )}
            onClick={() => navigateCallback(direction)}
            onMouseDown={onNavigateStart}
            onTouchStart={onNavigateStart}
            onMouseLeave={onNavigateEnd}
            onMouseUp={onNavigateEnd}
            onTouchEnd={onNavigateEnd}
        >
            {icon}
        </button>
    );
};

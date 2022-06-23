import { Next, Back } from '@navikt/ds-icons';
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
    const icon = direction === 1 ? <Back /> : <Next />;
    return (
        <button
            className={classNames(
                style.navigationButton,
                hidden && style.hidden,
                direction === 1 ? style.leftSide : style.rightSide
            )}
            onClick={() => navigateCallback(direction)}
        >
            {icon}
        </button>
    );
};

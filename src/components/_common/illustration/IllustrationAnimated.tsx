import { useEffect, useState, useRef } from 'react';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import lottie from 'lottie-web';
import { BEM, classNames } from '../../../utils/classnames';

import './Illustration.less';

interface IllustrationAnimatedProps {
    illustration: AnimatedIconsProps;
    className: string;
    isHovering: boolean;
    isPressed: boolean;
}

const bem = BEM('illustration');

export const IllustrationAnimated = ({
    illustration,
    className,
    isHovering,
    isPressed,
}: IllustrationAnimatedProps) => {
    // Need baseClassName to scope this component
    // as it's being used throughout the page.
    const [direction, setDirection] = useState(null);
    const lottieContainer = useRef(null);
    const lottiePlayer = useRef(null);

    const { lottieActive, lottieHover } = illustration.data;

    const updateLottieContainer = (lottieData) => {
        const container = lottieContainer.current;

        if (container.innerHTML) {
            container.innerHTML = '';
        }

        const player = lottie.loadAnimation({
            container: container,
            animationData: JSON.parse(JSON.parse(lottieData)),
            autoplay: false,
            loop: false,
        });

        lottiePlayer.current = player;
    };

    useEffect(() => {
        const newDirection = isHovering ? 1 : -1;
        if (direction !== newDirection && lottiePlayer.current) {
            setDirection(newDirection);
            lottiePlayer.current.setDirection(newDirection);
            lottiePlayer.current.play();
        }
    }, [isHovering, direction]);

    useEffect(() => {
        const lottieData = isPressed ? lottieActive : lottieHover;
        updateLottieContainer(lottieData);
    }, []);

    useEffect(() => {
        const lottieData = isPressed ? lottieActive : lottieHover;
        updateLottieContainer(lottieData);
        if (isPressed) {
            lottiePlayer.current.play();
        }
    }, [isPressed, lottieActive, lottieHover]);

    if (!illustration) {
        return null;
    }

    return (
        <div
            className={classNames(bem('image'), className)}
            role="img"
            aria-label={illustration.displayName}
        >
            <div
                ref={lottieContainer}
                className={classNames(bem('lottie-container'))}
            />
        </div>
    );
};

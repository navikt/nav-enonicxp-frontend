import { useEffect, useState, useRef } from 'react';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import lottie from 'lottie-web';
import { BEM, classNames } from '../../../utils/classnames';

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

    const lottieDataHover = illustration.data?.lottieHover?.mediaText;
    const lottieDataActive = illustration.data?.lottieActive?.mediaText;

    const updateLottieContainer = (lottieData: string) => {
        const container = lottieContainer.current;

        if (container.innerHTML) {
            container.innerHTML = '';
        }

        try {
            const player = lottie.loadAnimation({
                container: container,
                animationData: JSON.parse(lottieData),
                autoplay: false,
                loop: false,
            });

            lottiePlayer.current = player;
        } catch (error) {
            return;
        }
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
        const lottieData = isPressed ? lottieDataActive : lottieDataHover;
        updateLottieContainer(lottieData);
        /* eslint-disable-next-line */
    }, []);

    useEffect(() => {
        const lottieData = isPressed ? lottieDataActive : lottieDataHover;
        updateLottieContainer(lottieData);
        if (isPressed) {
            lottiePlayer.current.play();
        }
    }, [isPressed, lottieDataActive, lottieDataHover]);

    if (!illustration) {
        return null;
    }

    return (
        <div
            className={classNames(bem('image'), className)}
            aria-hidden="true"
            role="presentation"
        >
            <div
                ref={lottieContainer}
                className={classNames(bem('lottie-container'))}
            />
        </div>
    );
};

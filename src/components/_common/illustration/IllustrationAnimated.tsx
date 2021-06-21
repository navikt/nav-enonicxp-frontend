import { useEffect, useState, useRef } from 'react';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import lottie from 'lottie-web';
import { BEM, classNames } from '../../../utils/classnames';

import './Illustration.less';

const animationData = require('./kontantstotte_hover.json');

interface IllustrationAnimatedProps {
    illustration: AnimatedIconsProps;
    className: string;
    isHovering: boolean;
}

const bem = BEM('illustration');

export const IllustrationAnimated = ({
    illustration,
    className,
    isHovering,
}: IllustrationAnimatedProps) => {
    // Need baseClassName to scope this component
    // as it's being used throughout the page.
    const [direction, setDirection] = useState(null);
    const lottieContainer = useRef(null);
    const lottiePlayer = useRef(null);

    useEffect(() => {
        const newDirection = isHovering ? 1 : -1;
        if (direction !== newDirection && lottiePlayer.current) {
            setDirection(newDirection);
            lottiePlayer.current.setDirection(newDirection);
            lottiePlayer.current.play();
        }
    }, [isHovering, direction]);

    useEffect(() => {
        const container = lottieContainer.current;
        if (container.innerHTML) {
            container.innerHTML = '';
        }
        const player = lottie.loadAnimation({
            container: container,
            animationData: JSON.parse(animationData),
            autoplay: false,
            loop: false,
        });

        lottiePlayer.current = player;
    }, []);

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

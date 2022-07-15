import React, { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { classNames } from '../../../utils/classnames';
import { fetchJson } from '../../../utils/fetch/fetch-utils';

import styleCommon from './Illustration.module.scss';
import styleAnimated from './IllustrationAnimated.module.scss';

interface IllustrationAnimatedProps {
    illustration: AnimatedIconsProps;
    className: string;
    isHovering: boolean;
}

const IllustrationAnimatedComponent = ({
    illustration,
    className,
    isHovering,
}: IllustrationAnimatedProps) => {
    // Need baseClassName to scope this component
    // as it's being used throughout the page.
    const [direction, setDirection] = useState(null);
    const lottieContainer = useRef(null);
    const lottiePlayer = useRef(null);

    const { data: lottieData } = useSWR<string | null>(
        illustration.data.lottieHover.mediaUrl,
        fetchJson
    );

    const updateLottieContainer = async (lottieData: string) => {
        const lottie = await import('lottie-web/build/player/lottie_light.min');

        const container = lottieContainer.current;

        if (container.innerHTML) {
            container.innerHTML = '';
        }

        try {
            lottiePlayer.current = lottie.loadAnimation({
                container: container,
                animationData: JSON.parse(lottieData),
                autoplay: false,
                loop: false,
            });
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
        if (lottieData) {
            updateLottieContainer(lottieData);
        }
    }, [lottieData]);

    return (
        <div
            className={classNames(styleCommon.image, className)}
            aria-hidden="true"
            role="presentation"
        >
            <div
                ref={lottieContainer}
                className={styleAnimated.lottieContainer}
            />
        </div>
    );
};

export const IllustrationAnimated = (props: IllustrationAnimatedProps) => {
    if (!props.illustration?.data.lottieHover?.mediaUrl) {
        return null;
    }

    return <IllustrationAnimatedComponent {...props} />;
};

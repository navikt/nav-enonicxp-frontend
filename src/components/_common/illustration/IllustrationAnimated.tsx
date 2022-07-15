import React, { useEffect, useState, useRef } from 'react';
import useSWR from 'swr';
import { AnimatedIconsProps } from 'types/content-props/animated-icons';
import { classNames } from '../../../utils/classnames';
import { fetchJson } from '../../../utils/fetch/fetch-utils';

import styleCommon from './Illustration.module.scss';
import styleAnimated from './IllustrationAnimated.module.scss';

// JSON files in XP are double-encoded...
const fetchAndParse = (url: string) =>
    fetchJson(url).then((jsonString) => JSON.parse(jsonString));

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

    const { data: lottieData } = useSWR(
        illustration.data.lottieHover.mediaUrl,
        fetchAndParse
    );

    useEffect(() => {
        const newDirection = isHovering ? 1 : -1;
        if (direction !== newDirection && lottiePlayer.current) {
            setDirection(newDirection);
            lottiePlayer.current.setDirection(newDirection);
            lottiePlayer.current.play();
        }
    }, [isHovering, direction]);

    useEffect(() => {
        const updateLottieContainer = async () => {
            const lottie = await import(
                'lottie-web/build/player/lottie_light.min'
            );

            const container = lottieContainer.current;

            if (container.innerHTML) {
                container.innerHTML = '';
            }

            try {
                lottiePlayer.current = lottie.loadAnimation({
                    container: container,
                    animationData: lottieData,
                    autoplay: false,
                    loop: false,
                });
            } catch (error) {
                return;
            }
        };

        if (lottieData) {
            updateLottieContainer();
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

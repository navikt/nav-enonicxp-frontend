import React, { useEffect, useState, useRef } from 'react';
import useSWRImmutable from 'swr/immutable';
import { classNames } from '../../../utils/classnames';
import { fetchJson } from '../../../utils/fetch/fetch-utils';

import styleCommon from './Illustration.module.scss';
import styleAnimated from './IllustrationAnimated.module.scss';

const appOrigin = process.env.APP_ORIGIN;

const fetchJsonData = (url: string) =>
    fetchJson(`${appOrigin}/api/jsonCache?url=${url}`);

interface IllustrationAnimatedProps {
    dataUrl: string;
    className: string;
    isHovering: boolean;
}

export const IllustrationAnimated = ({
    dataUrl,
    className,
    isHovering,
}: IllustrationAnimatedProps) => {
    // Need baseClassName to scope this component
    // as it's being used throughout the page.
    const [direction, setDirection] = useState(null);
    const lottieContainer = useRef(null);
    const lottiePlayer = useRef(null);

    const { data: lottieData } = useSWRImmutable(dataUrl, fetchJsonData);

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

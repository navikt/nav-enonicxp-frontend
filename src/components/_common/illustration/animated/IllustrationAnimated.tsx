import React, { useEffect, useRef, useId } from 'react';

import { classNames } from 'utils/classnames';
import { fetchJson } from 'srcCommon/fetch-utils';
import { useSWRImmutableOnScrollIntoView } from 'utils/fetch/useSWRImmutableOnScrollIntoView';
import type { AnimationItem } from 'lottie-web';
import styleCommon from 'components/_common/illustration/Illustration.module.scss';

import styleAnimated from './IllustrationAnimated.module.scss';

const fetchJsonData = (url: string) =>
    fetchJson(`${process.env.APP_ORIGIN}/api/jsonCache?url=${url}`);

type Props = {
    dataUrl: string;
    isHovering: boolean;
    className?: string;
};

export const IllustrationAnimated = ({ dataUrl, isHovering, className }: Props) => {
    const lottieContainer = useRef<HTMLDivElement | null>(null);
    const lottiePlayer = useRef<AnimationItem | null>(null);

    const elementId = useId();

    const { data: lottieData } = useSWRImmutableOnScrollIntoView({
        url: dataUrl,
        fetchFunc: fetchJsonData,
        elementId,
    });

    useEffect(() => {
        if (!lottiePlayer.current) {
            return;
        }

        const newDirection = isHovering ? 1 : -1;
        if (newDirection === lottiePlayer.current.playDirection) {
            return;
        }

        lottiePlayer.current.setDirection(newDirection);
        lottiePlayer.current.play();
    }, [isHovering]);

    useEffect(() => {
        const updateLottieContainer = async () => {
            const container = lottieContainer.current;
            if (!container) {
                return;
            }

            const lottie = (await import('lottie-web/build/player/lottie_light')).default;

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
            } catch (_) {
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
            aria-hidden={'true'}
            id={elementId}
        >
            <div ref={lottieContainer} className={styleAnimated.lottieContainer} />
        </div>
    );
};

import React, { useEffect, useRef, useState } from 'react';
import { classNames } from '../../../utils/classnames';

import style from './AnimateHeight.module.scss';

type Props = {
    // Changing this prop will trigger the animation
    // Should be changed together with the children, for any changes we want to animate
    trigger: any;
    pxPerSec?: number;
    fadeTime?: number;
    fullwidth?: boolean;
    children: React.ReactNode;
};

export const AnimateHeight = ({
    trigger,
    pxPerSec = 2000,
    fadeTime = 200,
    fullwidth,
    children,
}: Props) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [isFirstRender, setIsFirstRender] = useState(true);
    const [prevHeight, setPrevHeight] = useState<number | null>(null);
    const [heightToRender, setHeightToRender] = useState<number | null>(null);
    const [fadeOut, setFadeOut] = useState(false);
    const [duration, setDuration] = useState<number | null>(null);

    const [childrenToRender, setChildrenToRender] =
        useState<React.ReactNode>(children);

    useEffect(() => {
        // Prevents the animations from running on the initial render
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }

        // We first get the current container height
        const height = containerRef.current.scrollHeight;
        setPrevHeight(height);

        // Then we render the new children
        if (fadeTime) {
            setFadeOut(true);
            setTimeout(() => setChildrenToRender(children), fadeTime);
        } else {
            setChildrenToRender(children);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger]);

    useEffect(() => {
        if (fadeTime) {
            setTimeout(() => setFadeOut(false), fadeTime);
        }

        // Get the new container height
        const height = containerRef.current.scrollHeight;

        // But set the height to the old value
        setHeightToRender(prevHeight);

        // Trigger animation by setting the new height on the next frame
        const animationFrameRequestHandle = requestAnimationFrame(() =>
            setHeightToRender(height)
        );

        // Calculate the duration of the transition from the height delta to ensure
        // a consistent animation speed
        const durationMs = (Math.abs(prevHeight - height) / pxPerSec) * 1000;
        setDuration(durationMs);

        // After the transition is finished, remove the height attribute
        // We don't want to leave the height static, in case the content of
        // the container changes
        setTimeout(() => {
            // Cancel the animationframe request in case it is slower than our
            // calculated animation duration
            window.cancelAnimationFrame(animationFrameRequestHandle);
            setHeightToRender(null);
        }, durationMs);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [childrenToRender]);

    return (
        <div
            className={classNames(
                style.container,
                heightToRender !== null && style.animated,
                fadeOut && style.fade,
                fullwidth && style.fullwidth
            )}
            ref={containerRef}
            style={{
                ...(heightToRender !== null && {
                    height: `${heightToRender}px`,
                    transitionDuration: `${duration}ms`,
                }),
                ...(fadeOut && {
                    animationDuration: `${fadeTime}ms`,
                }),
            }}
        >
            {childrenToRender}
        </div>
    );
};

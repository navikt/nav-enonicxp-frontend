import React, { useEffect, useRef, useState } from 'react';

import style from './AnimateOnChange.module.scss';

type Props = {
    renderTrigger: string;
    pxPerSec?: number;
    children: React.ReactNode;
};

export const AnimateOnChange = ({
    renderTrigger,
    pxPerSec = 1500,
    children,
}: Props) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [prevHeight, setPrevHeight] = useState<number | null>();
    const [heightToRender, setHeightToRender] = useState<number | null>(null);
    const [duration, setDuration] = useState<number | null>(null);

    const [childrenToRender, setChildrenToRender] =
        useState<React.ReactNode>(children);

    useEffect(() => {
        const height = containerRef.current.scrollHeight;
        setPrevHeight(height);
        setChildrenToRender(children);
    }, [renderTrigger]);

    useEffect(() => {
        const height = containerRef.current.scrollHeight;
        setHeightToRender(prevHeight);
        requestAnimationFrame(() => setHeightToRender(height));

        const durationMs = (Math.abs(prevHeight - height) / pxPerSec) * 1000;
        setDuration(durationMs);

        setTimeout(() => setHeightToRender(null), durationMs);
    }, [childrenToRender]);

    return (
        <div
            className={style.animated}
            ref={containerRef}
            style={{
                ...(duration !== null && {
                    transitionDuration: `${duration}ms`,
                }),
                ...(heightToRender !== null && {
                    height: `${heightToRender}px`,
                }),
            }}
        >
            {childrenToRender}
        </div>
    );
};

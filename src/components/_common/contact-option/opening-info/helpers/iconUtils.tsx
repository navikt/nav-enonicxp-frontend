import React, { useState } from 'react';
import style from '../../ContactOption.module.scss';

const appOrigin = process.env.APP_ORIGIN;

type UseHoverAndFocus = {
    isActive: boolean;
    handlers: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onFocus: () => void;
        onBlur: () => void;
    };
};

export function useHoverAndFocus(): UseHoverAndFocus {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handlers = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
    };

    return { isActive: isHovered || isFocused, handlers };
}

export const hoverFocusIcon = (
    iconDefault: string,
    iconActive: string,
    isActive: boolean,
    customStyle: string = ''
) => (
    <>
        <img
            alt=""
            // className={`${style.icon} ${customStyle}`}
            className={`${customStyle}`}
            src={`${appOrigin}/gfx/${iconDefault}`}
            style={{
                display: isActive ? 'none' : 'block',
            }}
        />
        <img
            alt=""
            // className={`${style.icon} ${customStyle}`}
            className={`${customStyle}`}
            src={`${appOrigin}/gfx/${iconActive}`}
            style={{
                display: isActive ? 'block' : 'none',
            }}
        />
    </>
);

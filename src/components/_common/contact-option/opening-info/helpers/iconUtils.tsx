import React, { useState } from 'react';

export function useHoverAndFocus(): [
    boolean,
    {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onFocus: () => void;
        onBlur: () => void;
    },
] {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const bind = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
    };

    return [isHovered || isFocused, bind];
}

export const iconWithTwoStates = (
    appOrigin: string,
    iconName: string,
    isActive: boolean
) => (
    <>
        <img
            alt=""
            // className={style.icon}
            src={`${appOrigin}/gfx/${iconName}.svg`}
            style={{
                display: isActive ? 'none' : 'block',
            }}
        />
        <img
            alt=""
            // className={style.icon}
            src={`${appOrigin}/gfx/${iconName}-filled.svg`}
            style={{
                display: isActive ? 'block' : 'none',
            }}
        />
    </>
);

import React, { useState } from 'react';

// TODO: skriv om til å importe image assets og bruk CSS for hover state etc

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

interface HoverFocusIconProps {
    iconDefault: string;
    iconActive: string;
    isActive: boolean;
    style?: string;
    altText?: string;
}

export const hoverFocusIcon = ({
    iconDefault,
    iconActive,
    isActive,
    style = '',
    altText = '',
}: HoverFocusIconProps) => (
    <>
        <img
            alt={altText}
            className={`${style}`}
            src={`${appOrigin}/gfx/${iconDefault}`}
            style={{
                display: isActive ? 'none' : 'block',
            }}
        />
        <img
            alt={altText}
            className={`${style}`}
            src={`${appOrigin}/gfx/${iconActive}`}
            style={{
                display: isActive ? 'block' : 'none',
            }}
        />
    </>
);

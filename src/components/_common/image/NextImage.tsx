import React from 'react';
import Image, { ImageProps } from 'next/image';

export const NextImage = (props: ImageProps) => {
    const { src } = props;

    if (!src) {
        return null;
    }

    const isSvg = typeof src === 'string' && src.endsWith('.svg');

    if (isSvg) {
        console.log(src);
        return (
            <Image
                {...props}
                alt={props.alt || ''}
                layout={'raw'}
                width={100}
                height={100}
            />
        );
    }

    const { alt = '', layout = 'fill', width = '100', height = '100' } = props;

    return (
        <Image
            {...props}
            src={src}
            alt={alt}
            layout={layout}
            width={width}
            height={height}
        />
    );
};

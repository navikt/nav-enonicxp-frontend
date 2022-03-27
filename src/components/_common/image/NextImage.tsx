import React from 'react';
import Image, { ImageProps } from 'next/image';

export const NextImage = (props: ImageProps) => {
    const { src } = props;

    if (!src) {
        return null;
    }

    const isSvg = typeof src === 'string' && src.endsWith('.svg');

    if (isSvg) {
        return <Image {...props} alt={props.alt || ''} layout={'raw'} />;
    }

    const { alt = '', layout = 'fill' } = props;

    return <Image {...props} src={src} alt={alt} layout={layout} />;
};

import React from 'react';
import { XpImageProps } from '../../../types/media';

type Props = {
    imageProps: XpImageProps;
    scale?: string;
    alt?: string;
    className?: string;
};

export const getImageUrl = (imageProps: XpImageProps, scale?: string) => {
    if (!imageProps) {
        return null;
    }

    if (imageProps.__typename === 'media_Image' && scale) {
        return imageProps.imageUrl?.replace('$scale', scale);
    }

    return imageProps.mediaUrl;
};

export const XpImage = ({ imageProps, alt = '', scale, className }: Props) => {
    const imageUrl = getImageUrl(imageProps, scale);
    if (!imageUrl) {
        return null;
    }

    return <img src={imageUrl} alt={alt} className={className} />;
};

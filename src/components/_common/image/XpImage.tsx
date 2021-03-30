import React from 'react';
import { MediaType, XpImageProps } from '../../../types/media';
import { getMediaUrl } from '../../../utils/urls';

type Props = {
    imageProps: XpImageProps;
    scale?: string;
    alt?: string;
    className?: string;
};

export const getImageUrl = (image: XpImageProps, scale?: string) => {
    if (!image) {
        return null;
    }

    const url =
        image.__typename === MediaType.Image && scale
            ? image.imageUrl?.replace('$scale', scale)
            : image.mediaUrl;

    return getMediaUrl(url);
};

export const XpImage = ({ imageProps, alt = '', scale, className }: Props) => {
    const imageUrl = getImageUrl(imageProps, scale);
    if (!imageUrl) {
        return null;
    }

    return <img src={imageUrl} alt={alt} className={className} />;
};

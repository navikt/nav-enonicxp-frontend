import React from 'react';
import Image, { ImageProps } from 'next/image';
import { MediaType, XpImageProps } from '../../../types/media';
import { getMediaUrl } from '../../../utils/urls';

type Props = {
    imageProps: XpImageProps;
    alt: string;
    scale?: string;
    className?: string;
} & Partial<ImageProps>;

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

export const XpImage = ({
    imageProps,
    alt,
    scale,
    className,
    ...imgAttribs
}: Props) => {
    const imageUrl = getImageUrl(imageProps, scale);
    if (!imageUrl) {
        return null;
    }

    return (
        <Image
            src={imageUrl}
            alt={alt}
            className={className}
            layout={'raw'}
            width={'100'}
            height={'100'}
        />
    );
};

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { StaticImageData } from 'next/dist/client/image';

type Props = {
    imageData: StaticImageData;
    className?: string;
} & Omit<ImageProps, 'src'>;

export const StaticImage = (props: Props) => {
    const { imageData, alt, className, ...rest } = props;

    // Optimizing via next/image serves little purpose for vector-graphics that are
    // already static assets in the app
    if (imageData.src.endsWith('.svg')) {
        return <img src={imageData.src} alt={alt} className={className} />;
    }

    return <Image src={imageData} alt={alt} className={className} {...rest} />;
};

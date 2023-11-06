import React from 'react';
import { NextImage } from './NextImage';
import { StaticImageData } from 'next/image';

type Props = {
    imageData: StaticImageData;
    alt: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const StaticImage = (props: Props) => {
    const { imageData, alt, ...imgAttribs } = props;

    return (
        <NextImage
            {...imgAttribs}
            src={imageData.src}
            alt={alt}
            role={imgAttribs.role}
        />
    );
};

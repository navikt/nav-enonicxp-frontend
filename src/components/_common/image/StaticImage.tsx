import React from 'react';
import { StaticImageData } from 'next/dist/client/image';
import { NextImage } from './NextImage';

type Props = {
    imageData: StaticImageData;
    alt: string;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const StaticImage = (props: Props) => {
    const { imageData, alt, ...imgAttribs } = props;

    const ariaRole = imgAttribs.role || !alt ? 'presentation' : null;

    return (
        <NextImage
            {...imgAttribs}
            src={imageData.src}
            alt={alt}
            role={ariaRole}
        />
    );
};

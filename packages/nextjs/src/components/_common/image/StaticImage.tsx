import React from 'react';
import { StaticImageData } from 'next/image';
import { NextImage } from './NextImage';

type Props = {
    imageData: StaticImageData;
} & React.ImgHTMLAttributes<HTMLImageElement>;

export const StaticImage = (props: Props) => {
    const { imageData, ...imgAttribs } = props;

    return <NextImage {...imgAttribs} src={imageData.src} alt="" aria-hidden="true" />;
};

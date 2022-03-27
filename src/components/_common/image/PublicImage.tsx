import React from 'react';
import { NextImage } from './NextImage';

type Props = {
    imagePath: string;
    alt: string;
    className?: string;
};

export const PublicImage = async ({ imagePath, alt, className }: Props) => {

    return (
        <NextImage src={imagePath} alt={alt} className={className} layout={'raw'} />
    );
};

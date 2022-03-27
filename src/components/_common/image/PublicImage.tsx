import React from 'react';
import Image from 'next/image';

type Props = {
    imagePath: string;
    alt: string;
    className?: string;
};

export const PublicImage = ({ imagePath, alt, className }: Props) => {
    return (
        <Image
            src={`${process.env.APP_ORIGIN}${imagePath}`}
            alt={alt}
            className={className}
            layout={'raw'}
            width={'100'}
            height={'100'}
        />
    );
};

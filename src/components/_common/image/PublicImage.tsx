import React from 'react';

type Props = {
    imagePath: string;
    alt: string;
    className?: string;
};

export const PublicImage = ({ imagePath, alt, className }: Props) => {
    return (
        <img
            src={`${process.env.APP_ORIGIN}${imagePath}`}
            alt={alt}
            className={className}
        />
    );
};

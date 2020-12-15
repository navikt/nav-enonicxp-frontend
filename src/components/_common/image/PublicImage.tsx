import React from 'react';

export const PublicImage = ({ imagePath }: { imagePath: string }) => {
    return <img src={`${process.env.APP_ORIGIN}${imagePath}`} alt={''} />;
};

import React from 'react';
import { updateImageManifest } from '../../../utils/fetch/fetch-images';
import { buildImageCacheUrl, NextImageProps } from './NextImage';

type Props = {
    src: string;
    alt: string;
} & React.ImgHTMLAttributes<HTMLImageElement> &
    NextImageProps;

export const NextImageBuildTime = (props: Props) => {
    const { src, alt, maxWidth = 1440, quality = 90, ...imgAttribs } = props;

    if (!src) {
        return null;
    }

    const cachedSrc = buildImageCacheUrl({ src, maxWidth, quality });

    // This should only run at build-time
    updateImageManifest(cachedSrc);

    return <img {...imgAttribs} src={cachedSrc} alt={alt} />;
};

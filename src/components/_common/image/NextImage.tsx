import React from 'react';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import Config from '../../../config';
import { updateImageManifest } from '../../../utils/fetch/fetch-images';

// These types should match what's specified in next.config
type DeviceSize = 480 | 768 | 1024 | 1440;
type ImageSize = 16 | 32 | 48 | 64 | 96 | 128 | 256 | 384;

// Optimalization parameters for next/image cache
export type NextImageProps = {
    maxWidth?: DeviceSize | ImageSize;
    quality?: number;
};

type Props = {
    src: string;
    alt: string;
} & React.ImgHTMLAttributes<HTMLImageElement> &
    NextImageProps;

const maxWidthDefault: DeviceSize = 1440;
const qualityDefault = 90;

const origin = Config.isFailover
    ? process.env.FAILOVER_ORIGIN
    : process.env.APP_ORIGIN;

// Get the image from the next.js incremental image cache endpoint
//
// This is intended to be called from the next.js <Image/> component, which comes
// with some extra benefits for responsive design and optimalization. However this
// requires refactoring most of our existing image code/CSS to render correctly
//
// TODO: refactor our existing image code/CSS :)
const buildImageCacheUrl = ({ src, maxWidth, quality }: Partial<Props>) =>
    `${origin}/_next/image?url=${encodeURIComponent(
        src
    )}&w=${maxWidth}&q=${quality}`;

export const NextImage = (props: Props) => {
    const { pageConfig } = usePageConfig();

    const {
        src,
        alt,
        maxWidth = maxWidthDefault,
        quality = qualityDefault,
        ...imgAttribs
    } = props;

    if (!src) {
        return null;
    }

    // We don't want caching for the editor-views. Always use the raw source.
    if (pageConfig.editorView) {
        return <img {...imgAttribs} src={src} alt={alt} />;
    }

    const cachedSrc = buildImageCacheUrl({ src, maxWidth, quality });

    updateImageManifest(cachedSrc);

    return <img {...imgAttribs} src={cachedSrc} alt={alt} />;
};

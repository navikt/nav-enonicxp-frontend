import React from 'react';
import { usePageConfig } from '../../../store/hooks/usePageConfig';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import { isValidImageUrl } from '../../../utils/urls';
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

const origin =
    typeof process.env !== 'undefined' &&
    process.env.IS_FAILOVER_INSTANCE === 'true'
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
    // Decode then encode to ensure nothing gets double-encoded
    `${origin}/_next/image?url=${encodeURIComponent(
        decodeURIComponent(src)
    )}&w=${maxWidth}&q=${quality}`;

const NextImageBuildTime = (props: Props) => {
    const { src, alt, maxWidth = 1440, quality = 90, ...imgAttribs } = props;

    if (!src) {
        return null;
    }

    const cachedSrc = buildImageCacheUrl({ src, maxWidth, quality });

    // This should only run at build-time
    updateImageManifest(cachedSrc);

    return <img {...imgAttribs} src={cachedSrc} alt={alt} />;
};

const NextImageRunTime = (props: Props) => {
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

    // Skip caching when viewed from the editor, or for external image urls
    if (pageConfig.editorView || !isValidImageUrl(src)) {
        return <img {...imgAttribs} src={src} alt={alt} />;
    }

    return (
        <img
            {...imgAttribs}
            src={buildImageCacheUrl({ src, maxWidth, quality })}
            alt={alt}
        />
    );
};

export const NextImage =
    typeof process.env !== 'undefined' &&
    process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
        ? NextImageBuildTime
        : NextImageRunTime;

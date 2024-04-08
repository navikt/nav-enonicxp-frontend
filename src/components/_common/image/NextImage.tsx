import React from 'react';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import dynamic from 'next/dynamic';
import { usePageContentProps } from 'store/pageContext';
import { isValidImageUrl } from 'utils/urls';

// These types should match what's specified in next.config
type DeviceSize = 480 | 768 | 1024 | 1440;
type ImageSize = 16 | 32 | 48 | 64 | 96 | 128 | 256 | 384;

// Optimalization parameters for next/image cache
export type NextImageProps = {
    maxWidth?: DeviceSize | ImageSize;
    quality?: number;
};

export type ImageProps = {
    src: string;
    alt: string;
} & React.ImgHTMLAttributes<HTMLImageElement> &
    NextImageProps;

const maxWidthDefault: DeviceSize = 1440;
const qualityDefault = 90;

const origin =
    typeof process.env !== 'undefined' && process.env.IS_FAILOVER_INSTANCE === 'true'
        ? process.env.FAILOVER_ORIGIN
        : process.env.APP_ORIGIN;

// Get the image from the next.js incremental image cache endpoint
//
// This is intended to be called from the next.js <Image/> component, which comes
// with some extra benefits for responsive design and optimalization. However this
// requires refactoring most of our existing image code/CSS to render correctly
//
// TODO: refactor our existing image code/CSS :)
export const buildImageCacheUrl = ({
    src,
    isEditorView,
    maxWidth,
    quality,
}: { src: string; isEditorView: boolean } & NextImageProps) => {
    if (isEditorView || !isValidImageUrl(src)) {
        return src;
    }

    // Decode then encode to ensure nothing gets double-encoded
    return `${origin}/_next/image?url=${encodeURIComponent(
        decodeURIComponent(src)
    )}&w=${maxWidth}&q=${quality}`;
};

const NextImageRunTime = (props: ImageProps) => {
    const { src, alt, maxWidth = maxWidthDefault, quality = qualityDefault, ...imgAttribs } = props;

    const { editorView } = usePageContentProps();

    if (!src) {
        return null;
    }

    return (
        <img
            {...imgAttribs}
            src={buildImageCacheUrl({
                src,
                maxWidth,
                quality,
                isEditorView: !!editorView,
            })}
            alt={alt}
        />
    );
};

export const NextImage =
    typeof process.env !== 'undefined' && process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD
        ? dynamic(
              import('./NextImageBuildTime').then((module) => {
                  const { NextImageBuildTime } = module;
                  return NextImageBuildTime;
              })
          )
        : NextImageRunTime;

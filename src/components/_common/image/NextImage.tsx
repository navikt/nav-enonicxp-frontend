import React from 'react';

// These types should match what's specified in next.config
type DeviceSize = 480 | 768 | 1024 | 1440;
type ImageSize = 16 | 32 | 48 | 64 | 96 | 128 | 256 | 384;

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

// Get the image from the next.js incremental image cache endpoint
//
// This is intended to be used with the next.js <Image/> component, which comes
// with some extra benefits for responsive design and optimizations. However this
// requires refactoring most of our existing image code/CSS to render correctly
//
// TODO: refactor our existing image code/CSS :)
const getCacheUrl = ({ src, maxWidth, quality }: Partial<Props>) =>
    `/_next/image?url=${encodeURIComponent(src)}&w=${
        maxWidth || maxWidthDefault
    }&q=${quality || qualityDefault}`;

export const NextImage = (props: Props) => {
    const { src, alt, maxWidth, quality, ...imgAttribs } = props;

    if (!src) {
        return null;
    }

    return (
        <img
            {...imgAttribs}
            src={getCacheUrl({ src, maxWidth, quality })}
            alt={alt}
        />
    );
};

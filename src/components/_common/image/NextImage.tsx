import React from 'react';

const widthDefault = 1920;
const qualityDefault = 90;

// Get the image from the next.js incremental image cache endpoint
//
// This is intended to be used with the next.js <Image/> component, which comes
// with some extra benefits for responsive design and optimizations. However this
// requires refactoring most of our existing image code/CSS to render correctly
//
// TODO: refactor our existing image code/CSS :)
const getCacheUrl = ({
    src,
    maxWidth,
    quality,
}: Pick<Props, 'src' | 'maxWidth' | 'quality'>) =>
    `/_next/image?url=${encodeURIComponent(src)}&w=${
        maxWidth || widthDefault
    }&q=${quality || qualityDefault}`;

type Props = {
    src: string;
    alt: string;
    maxWidth?: number;
    quality?: number;
} & React.ImgHTMLAttributes<HTMLImageElement>;

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

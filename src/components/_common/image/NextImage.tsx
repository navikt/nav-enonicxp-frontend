import React from 'react';

const widthDefault = 1920;
const qualityDefault = 90;

// Get the image from the next.js incremental image cache. We can also
// use the <Image/> component for this, however this comes with built-in
// responsive layout functionality, and requires refactoring most of our
// existing image components/CSS to render correctly
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

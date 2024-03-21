import React from 'react';
import { XpImageProps } from 'types/media';
import { getMediaUrl } from 'utils/urls';
import { NextImage, NextImageProps } from './NextImage';
import { usePageContentProps } from 'store/pageContext';

type Props = {
    imageProps: XpImageProps;
    alt: string;
} & React.ImgHTMLAttributes<HTMLImageElement> &
    NextImageProps;

export const XpImage = ({ imageProps, alt, ...rest }: Props) => {
    const { editorView } = usePageContentProps();

    const imageUrl = getMediaUrl(imageProps.mediaUrl, !!editorView);
    if (!imageUrl) {
        return null;
    }

    return <NextImage {...rest} src={imageUrl} alt={''} />;
};

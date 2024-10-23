import React from 'react';
import { XpImageProps } from 'types/media';
import { getMediaUrl } from 'utils/urls';
import { usePageContentProps } from 'store/pageContext';
import { NextImage, NextImageProps } from './NextImage';

type Props = {
    imageProps: XpImageProps;
    alt?: string;
} & React.ImgHTMLAttributes<HTMLImageElement> &
    NextImageProps;

export const XpImage = ({ imageProps, alt, ...rest }: Props) => {
    const { editorView, language } = usePageContentProps();

    const imageUrl = getMediaUrl(imageProps.mediaUrl, !!editorView, language);
    if (!imageUrl) {
        return null;
    }

    return <NextImage {...rest} src={imageUrl} alt={alt || ''} />;
};

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

    const isFullUrl = (url: string) => /^https?:\/\//.test(url);

    // Determine the image URL based on whether it's a full URL or relative path
    let imageUrl: string | undefined;

    if (imageProps.mediaUrl) {
        if (isFullUrl(imageProps.mediaUrl)) {
            // Use the URL as-is if it's already a full URL
            imageUrl = imageProps.mediaUrl;
        } else {
            // Process relative URLs through the media URL utility
            imageUrl = getMediaUrl(imageProps.mediaUrl, !!editorView, language);
        }
    }

    if (!imageUrl) {
        return null;
    }

    return <NextImage {...rest} src={imageUrl} alt={alt || ''} />;
};

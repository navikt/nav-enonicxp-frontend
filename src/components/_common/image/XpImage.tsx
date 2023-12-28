import React from 'react';
import { XpImageProps } from 'types/media';
import { getMediaUrl } from 'utils/urls';
import { NextImage, NextImageProps } from './NextImage';
import { usePageConfig } from 'store/hooks/usePageConfig';

type Props = {
    imageProps: XpImageProps;
    alt: string;
} & React.ImgHTMLAttributes<HTMLImageElement> &
    NextImageProps;

export const XpImage = ({ imageProps, alt, ...rest }: Props) => {
    const { pageConfig } = usePageConfig();

    const imageUrl = getMediaUrl(imageProps.mediaUrl, !!pageConfig.editorView);
    if (!imageUrl) {
        return null;
    }

    return <NextImage {...rest} src={imageUrl} alt={''} />;
};

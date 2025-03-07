import React from 'react';
import { usePageContentProps } from 'store/pageContext';
import { updateImageManifest } from 'utils/fetch/fetch-images';
import { buildImageCacheUrl, ImageProps } from './NextImage';

export const NextImageBuildTime = (props: ImageProps) => {
    const { src, alt, maxWidth = 1440, quality = 90, ...imgAttribs } = props;
    const { editorView } = usePageContentProps();

    if (!src) {
        return null;
    }

    const cachedSrc = buildImageCacheUrl({
        src,
        maxWidth,
        quality,
        isEditorView: !!editorView,
    });

    // This should only run at build-time
    updateImageManifest(cachedSrc);

    return <img {...imgAttribs} src={cachedSrc} alt={alt} />;
};

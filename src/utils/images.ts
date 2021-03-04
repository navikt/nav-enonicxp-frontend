import { MediaType, XpImage } from '../types/media';

export const getImageUrl = (image: XpImage, scale?: string) => {
    if (!image) {
        return null;
    }

    if (image.__typename === MediaType.Image && scale) {
        return image.imageUrl?.replace('$scale', scale);
    }

    return image.mediaUrl;
};
